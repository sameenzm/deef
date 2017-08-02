/**
 * Created by baidu on 17/4/12.
 */
import React from 'react';
import TitleWindow from 'fcui2/TitleWindow.jsx'
import SearchBox from 'fcui2/SearchBox.jsx'
import _ from 'lodash';

import './style.less';


export default ({onImportTitle, isOpen, isRequesting, searchQuery, listData, ...callbacks}) => {
    const {onSearchInput, onSearch, onImportClick, onClose} = callbacks;

    return <TitleWindow
        title="导入已有标题"
        isOpen={isOpen}
        size={{
            width: 400,
            height: 300
        }}
        showCloseButton
        onClose={onClose}
    >
        <div className="idea-editor-import-title-dialog">
            <SearchBox
                placeholder="请输入标题关键字"
                value={searchQuery}
                onChange={onSearchInput}
                onClick={onSearch}
            />
            {
                isRequesting
                    ? <div className="list-tip">正在加载...</div>
                    : (
                        !listData.length
                            ? <div className="list-tip">
                                暂无标题，去新建创意吧！
                            </div>
                            : <ul className="title-list">
                                {
                                    listData.map(item => {
                                        const handleClick = _.partial(
                                            onImportClick, _.partial(onImportTitle, item.title)
                                        );
                                        return <li key={item.title} className="title-item">
                                            <div className="title-show">{item.title}</div>
                                            <a href="javascript:;" className="import-btn" onClick={handleClick}>导入</a>
                                        </li>;
                                    })
                                }
                            </ul>
                    )
            }
        </div>
    </TitleWindow>;
};