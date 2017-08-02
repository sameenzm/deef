/**
 * Created by Homkai on 2016/11/5.
 */
import {connect} from 'app';
import UI from './UI';
import {open as openImportTitleDialog} from './ImportTitleDialog/handler';

export default connect(
    ({ideaEditor: {formData}}) => ({formData}),
    {
        onFieldChange({dispatch}, field, e) {
            dispatch({
                type: 'ideaEditor/changeFormField',
                payload: {
                    field,
                    value: e.target.value
                }
            });
        },
        onImportTitle({dispatch}, value) {
            dispatch({
                type: 'ideaEditor/changeFormField',
                payload: {
                    field: 'title',
                    value
                }
            });
        },
        onSubmitValidate({dispatch}, errorMessageList) {
            errorMessageList && alert(errorMessageList.join('\n'));
        },
        onSubmit({dispatch}, form) {
            alert('提交成功！');

            dispatch({
                type: 'ideaEditor/resetFormData'
            });
        },
        onOpenImportTitleDialog: openImportTitleDialog
    }
)(UI);