import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider, connect as reduxConnect} from 'react-redux';
import handleActions from 'redux-actions/lib/handleActions';
import isPlainObject from 'lodash/isPlainObject';
import invariant from 'invariant';
import Event from './event';

const SEP = '/';

export default function (opts = {}) {
    const {
        initialReducer = {},
        initialState = {},
        reducerEnhancer = (reducers => reducers)
    } = opts;

    const event = new Event();

    // error wrapper
    event.on('error', function(err) {
        throw new Error(err.stack || err);
    });
    const onError = (err) => {
        if (err) {
            if (typeof err === 'string') err = new Error(err);
            event.trigger('error', [err]);
        }
    };

    const app = {
        // private properties
        _models: [],
        _store: null,
        _event: event,
        // methods
        model,
        start,
        connect
    };
    return app;


    ////////////////////////////////////
    // Methods

    /**
     * Register a model.
     *
     * @param model
     */
    function model(model) {
        this._models.push(checkModel(model));
    }

    // inject model dynamically
    function injectModel(createReducer, m) {
        if (m.namespace) {
            const hasExisted = this._models.some(model =>
                model.namespace === m.namespace
            );
            if (hasExisted) {
                return;
            }
        }
        m = checkModel(m);
        this._models.push(m);
        const store = this._store;

        // reducers
        store.additionalReducers[m.namespace] = getReducer(m.reducers, m.state);
        store.replaceReducer(createReducer(store.additionalReducers));
    }

    /**
     * Start the application. Selector is optional. If no selector
     * arguments, it will return a function that return JSX elements.
     *
     * @param container selector | HTMLElement
     * @param RootComponent Component
     */
    function start(container, RootComponent) {
        // support selector
        if (typeof container === 'string') {
            container = document.querySelector(container);
            invariant(container, 'deef->start: could not query selector: ' + container);
        }

        invariant(!container || isHTMLElement(container), 'deef->start: container should be HTMLElement');

        let reducers = { ...initialReducer };
        for (let m of this._models) {
            reducers[m.namespace] = getReducer(m.reducers, m.state);
        }

        let middlewares = [
            api => next => action => {
                event.trigger('action', [action]);
                return next(action);
            }
        ];
        const devtools = window.devToolsExtension || (() => noop => noop);
        const enhancers = [
            applyMiddleware(...middlewares),
            devtools(),
        ];
        const store = this._store = createStore(
            createReducer(),
            initialState,
            compose(...enhancers)
        );

        function createReducer(additionalReducers = {}) {
            return reducerEnhancer(combineReducers({
                ...reducers,
                ...additionalReducers
            }));
        }

        store.additionalReducers = {};

        store.subscribe(() => event.trigger('stateChange'));

        // inject model after start
        this.model = injectModel.bind(this, createReducer);

        // If has container, render; else, return react component
        if (container) {
            render(container, store, RootComponent);
            event.trigger('hmr', [render.bind(this, store, container)]);
        } else {
            return getProvider(store, RootComponent);
        }
    }

    function getProcessorArgs(actionMeta = {}) {
        return {
            getState: app._store.getState,
            dispatch: (action) => {
                action.meta = {...actionMeta, ...(action.meta || {})};
                try {
                    return app._store.dispatch(action);
                } catch(e) {
                    onError(e);
                }
            },
            on: (...args) => event.on.apply(event, args)
        };
    }

    function connect(mapStateToProps, processor = {}, ...args) {
        return Component => reduxConnect(
            mapStateToProps,
            (...args) => {
                if (isPlainObject(processor)) {
                    // 订阅只执行一次
                    if (!processor.initialized) {
                        let _handlers = {};
                        Object.keys(processor).map((key) => {
                            if (key === 'subscriptions') {
                                const subscriptions = processor[key];
                                invariant(
                                    isPlainObject(subscriptions) || Array.isArray(subscriptions),
                                    'deef->connect: subscriptions should be plain object or array'
                                );
                                Object.keys(subscriptions).map(sub => subscriptions[sub].call(null, getProcessorArgs({
                                    _subscriptions: key
                                })));
                            }
                            else {
                                _handlers[key] = (...args) => processor[key].call(null, getProcessorArgs({
                                    _handler: key
                                }), ...args);
                            }
                        });
                        processor._handlers = _handlers;
                        processor.initialized = true;
                    }
                    return processor._handlers;
                }
                if (typeof processor === 'function') {
                    args[0] = getProcessorArgs().dispatch;
                    return typeof processor === 'function' && processor(...args);
                }
            },
            ...args
        )(Component);
    }


    ////////////////////////////////////
    // Helpers

    function getProvider(store, RootComponent) {
        return () => (
            <Provider store={store}>
                <RootComponent />
            </Provider>
        );
    }

    function render(container, store, RootComponent) {
        ReactDOM.render(React.createElement(getProvider(store, RootComponent)), container);
    }

    function checkModel(m) {
        // Clone model to avoid prefixing namespace multiple times
        const model = {...m};
        const {namespace, reducers} = model;

        invariant(
            namespace,
            'deef->model: namespace should be defined'
        );
        invariant(
            !reducers || isPlainObject(reducers) || Array.isArray(reducers),
            'deef->model: reducers should be plain object or array'
        );
        invariant(
            !Array.isArray(reducers) || (isPlainObject(reducers[0]) && typeof reducers[1] === 'function'),
            'deef->model: reducers with array should be app.model({ reducers: [object, function] })'
        );

        function applyNamespace(type) {
            function getNamespacedReducers(reducers) {
                return Object.keys(reducers).reduce((memo, key) => {
                    invariant(
                        key.indexOf(`${namespace}${SEP}`) !== 0,
                        `deef->model: ${type.slice(0, -1)} ${key} should not be prefixed with namespace ${namespace}`
                    );
                    memo[`${namespace}${SEP}${key}`] = reducers[key];
                    return memo;
                }, {});
            }

            if (model[type]) {
                if (type === 'reducers' && Array.isArray(model[type])) {
                    model[type][0] = getNamespacedReducers(model[type][0]);
                } else {
                    model[type] = getNamespacedReducers(model[type]);
                }
            }
        }

        applyNamespace('reducers');

        return model;
    }

    function isHTMLElement(node) {
        return typeof node === 'object' && node !== null && node.nodeType && node.nodeName;
    }

    function getReducer(reducers, state) {
        if (Array.isArray(reducers)) {
            return reducers[1](handleActions(reducers[0], state));
        } else {
            return handleActions(reducers || {}, state);
        }
    }

};
