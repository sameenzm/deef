import {app} from 'app';
import model from './Root/model';
import Root from './Root';

import 'whatwg-fetch';

import 'fc-icon/style.css';
import 'fcui2/css/main.less';

app.model(model);
app.start('#root', Root);
