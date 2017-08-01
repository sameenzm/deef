/**
 * Created by baidu on 17/4/14.
 */
const importTitleDialog = {
    isOpen: false,
    listData: [],
    searchQuery: ''
};

const formData = {
    title: '',
    url: '',
};

const initialState = {
    formData,
    importTitleDialog
};

export default {
    namespace: 'ideaEditor',
    state: initialState,
    reducers: {
        changeFormField(state, {payload: {field, value}}) {
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [field]: value
                }

            };
        },
        resetFormData(state) {
            return {
                ...state,
                formData
            };
        },
        changeImportTitleDialog(state, {payload: importTitleDialog}) {
            return {
                ...state,
                importTitleDialog: {
                    ...state.importTitleDialog,
                    ...importTitleDialog
                }
            };
        },
        resetImportTitleDialog(state) {
            return {
                ...state,
                importTitleDialog
            };
        }
    }
};
