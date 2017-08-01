/**
 * Created by Homkai on 2016/11/5.
 */
import {connect} from 'app';
import UI from './UI';
import {loadList, close} from './handler'

export default connect(
    ({ideaEditor: {importTitleDialog}}) => importTitleDialog,
    {
        onSearchInput({dispatch, getState}, e) {
            dispatch({
                type: 'ideaEditor/changeImportTitleDialog',
                payload: {
                    searchQuery: e.target.value
                }
            });
        },
        onImportClick({dispatch, getState}, cb) {
            cb();
            close({dispatch, getState});
        },
        onSearch: loadList,
        onClose: close
    }
)(UI);