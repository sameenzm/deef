/**
 * @file 表单验证公共组件
 * @author chenmo04@baidu.com
 * @date 2017-07-07
 */
define(function (require) {
    const React = require('react');
    const _ = require('lodash');
    const Form = require('fcui2/Form.jsx');

    class FormWithValidation extends React.Component {
        constructor(...args) {
            super(...args);

            this.onFieldChange = this.onFieldChange.bind(this);
        }
        onFieldChange(form) {
            this.props.onFieldChange(form);

            const validationResults = form.validationResults;
            const errorMessageList = [];
            const separator = this.props.separator;
            _.mapValues(validationResults, (val, name) => {
                val.map(item => errorMessageList.push(name + separator + item));
            });

            const error = errorMessageList.length ? errorMessageList : null;
            if (form.field) {
                this.props.onFieldValidate(error, validationResults);
            }
            else {
                this.props.onSubmitValidate(error, validationResults);
            }
        }
        render() {
            const props = this.props;
            const formProps = {
                ...props,
                onFieldChange: this.onFieldChange,
                onSubmit: props.onSubmit
            };
            return (<Form {...formProps}>{props.children}</Form>);
        }
    }

    FormWithValidation.defaultProps = {
        separator: ':',
        onFieldChange: _.noop,
        onFieldValidate: _.noop,
        onSubmitValidate: _.noop
    };

    return FormWithValidation;
});
