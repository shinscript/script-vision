import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorDisplay from '../components/EditorDisplay.jsx';
import VisualDisplay from '../components/VisualDisplay.jsx';
import * as actions from '../actions/actions';

const mapStateToProps = store => ({
    code: store.main.code,
    declared: store.main.declared,
});
  
const mapDispatchToProps = dispatch => ({
    run:(code) => dispatch(actions.run(code)),
    clear:() => dispatch(actions.clear()),
    setCode:(code) => dispatch(actions.setCode(code)),
});

class MainContainer extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        const { code } = this.props;
        const { run, clear, setCode, declared} = this.props;
        return(
            <div className="main-container">
                <div className="btn-container">
                    <button onClick={() => run(code)}className="run-btn">Run</button>
                    <button onClick={() => clear()}className="clear-btn">Clear</button>
                </div>
                <EditorDisplay code={code} setCode={setCode} />
                <VisualDisplay code={code} onRun={run} declared={declared}/>
            </div>
        )
    }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);