/**
 * Created by baidu on 17/4/14.
 */
import app from './app';
import todoModels from '../modules/Todo/models';

export default [
    app,
    ...todoModels
];