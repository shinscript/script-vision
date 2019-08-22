import React from 'react';
import ExContext from './ExecutionContext.jsx';

const Visuals = (props) => {
    const stackArr = []; //Declarations;
    const memory = []; //Declarations & variables;
    const input = []; //Main Code/Block;
    const output = []; //Evaluated Values;
    props.declared.forEach((el, index) => {
        memory.push(<p key={`${el.declarations}` + index}>{el.declarations}</p>);
        stackArr.push(<p key={`${el.funcDeclarations}` + index}>{el.funcDeclarations}</p>);
        output.push(<p key={`${el.value}` + index}>Output: {el.value}</p>);

        if(el.invoked === true) {
            input.push(<ExContext key={`${el.funcBody}` + index} body={el.funcBody} mem={el.funcMem}/>)
        } else {
            input.push(<div className="code-body"><p key={`${el.codeBlock}` + index}>{el.codeBlock}</p></div>)
        }
    });

    return (
        <div className="visuals">
            <div className="main-block">
                <div className="code-block">{input}</div>
                <div className="output-block">{output}</div>
            </div>
            <div className="global">Global Memory{memory}</div>
            <div className="stack">Stack{stackArr}</div>
        </div>
    )

}
export default Visuals;