import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Control, Controller } from 'react-hook-form';
import { FormState } from './';
import toolbar from './toolbar';

type Props = {
    control: Control<FormState>
}

const Descricao = ({control}: Props) => (
    <Controller
        name="descricao"
        control={control}
        render={({ value, onChange }) => (
            <Editor
            toolbarClassName="toolbar-container"
            editorClassName="editor-container"
            editorState={value}
            onEditorStateChange={onChange}
            toolbar={toolbar}
            />
        )}
    />    
);

export default Descricao;