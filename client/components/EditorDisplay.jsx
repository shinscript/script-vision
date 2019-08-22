import React from 'react';
import AceEditor from 'react-ace';
import brace from 'brace';

import "brace/mode/javascript";
import "brace/theme/kuroir";

let hold = "";

const EditorDisplay = props => (
    <div className="editor-display">
        <AceEditor 
            placeholder="<ENTER JAVASCRIPT HERE>"
            mode="javascript"
            theme="kuroir"
            fontSize={16}
            wrapEnabled={true}
            onChange={(value) => props.setCode(`${value}`)}
            value={props.code}
            width={"100%"}
            height={"40rem"}
        />
    </div>
)



export default EditorDisplay;