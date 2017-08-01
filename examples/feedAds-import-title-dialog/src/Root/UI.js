/**
 * Created by baidu on 17/4/12.
 */
import React from 'react';
import _ from 'lodash';

import TextBox from 'fcui2/TextBox.jsx';
import Button from 'fcui2/Button.jsx';
import FormWithValidation from '../common/ui/FormWithValidation.jsx';

import ImportTitleDialog from './ImportTitleDialog';

import './style.less'


export default ({formData, ...callbacks}) => {
    const {onFieldChange, onOpenImportTitleDialog, onImportTitle, onSubmitValidate, onSubmit} = callbacks;

    return <main className="idea-editor-main">
        <h1>创意编辑器</h1>
        <FormWithValidation
            onSubmitValidate={onSubmitValidate}
            onSubmit={onSubmit}
        >
            <div className="row">
                <div className="label">标题：</div>
                <div className="control">
                    <TextBox
                        name="创意标题"
                        value={formData.title}
                        onChange={_.partial(onFieldChange, 'title')}
                        validations={{required: true}}
                    />
                </div>
                <div className="tip">
                    <Button label="导入已有标题" onClick={onOpenImportTitleDialog} />
                </div>
            </div>
            <div className="row">
                <div className="label">URL：</div>
                <div className="control">
                    <TextBox
                        name="创意URL"
                        value={formData.url}
                        onChange={_.partial(onFieldChange, 'url')}
                        validations={{required: true, isUrl: true}}
                    />
                </div>
            </div>
            <div className="actions">
                <Button label="提交" skin="important" type="submit" />
            </div>
        </FormWithValidation>
        <ImportTitleDialog onImportTitle={onImportTitle} />
    </main>;
};