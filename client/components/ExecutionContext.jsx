import React from 'react';


const ExContext = (props) => {
    return(
        <div className="context">
            <div className="func-body" >
                <h4>Execution Context</h4>
                {props.body}
            </div>
            <div className="func-mem">
                <h4>Local Memory</h4>
                {props.mem}
            </div>
        </div>
    )
}

export default ExContext;