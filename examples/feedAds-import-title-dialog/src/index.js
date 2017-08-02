import {app} from 'app';
import model from './IdeaEditor/model';
import Demo from './IdeaEditor';

import 'whatwg-fetch';

import 'fc-icon/style.css';
import 'fcui2/css/main.less';

app.model(model);
app.start('#root', Demo);
