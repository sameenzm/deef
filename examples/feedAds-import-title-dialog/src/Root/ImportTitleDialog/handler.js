/**
 * @file 导入标题弹窗公共handler
 * @note 对外暴露的接口以及可以复用的callback处理方法
 */
import fetch from '../../common/fetch';

export const loadList = ({dispatch, getState}) => {
    const {searchQuery} = getState().ideaEditor.importTitleDialog;

    fetch('/titleList', {
        searchQuery
    }).then(res => {
        const listData = res.data.listData;

        dispatch({
            type: 'ideaEditor/changeImportTitleDialog',
            payload: {
                listData
            }
        });
    });
};

export const open = ({dispatch, getState}) => {
    loadList({dispatch, getState});

    dispatch({
        type: 'ideaEditor/changeImportTitleDialog',
        payload: {
            isOpen: true
        }
    });
};

export const close = ({dispatch, getState}) => {
    dispatch({
        type: 'ideaEditor/resetImportTitleDialog'
    });
};
