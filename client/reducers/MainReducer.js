import * as types from '../constants/actionTypes';

const initialState = {
    code: '',
    declared: [],
};

const mainReducer = (state = initialState, actions) => {
    let declared;
    switch(actions.type) {
        case types.SET_CODE:
            return {
                ...state,
                code: actions.payload
            }
        case types.RUN_EDITOR:

            const disperseVals = {
                declarations: ``,
                codeBlock: ``, //const timesFive = (num) => { return num * 5;} //MAIN BODY for 1 liners
                funcBody: ``, //
                funcMem: ``,
                funcDeclarations: undefined, //timesFive(num); //STACK
                value: undefined, //OUTPUT
                invoked: false,
            };

            let code = actions.payload; //Setting payload to variable to work with, dont wanna be working with actions.payload everytime.
            let splitCode = code.split(" "); //splitting the entire text area from editor;
            let spaceSplit = code.split("\n"); //splitting via spaces/lines
            // let lastIndex = spaceSplit.indexOf('}'); //looking for closed function brackets
            let openP = code.indexOf('(');
            let openCP = spaceSplit[spaceSplit.length-1].lastIndexOf('(');

            let closeP = code.indexOf(')');
            let closeCP = spaceSplit[spaceSplit.length-1].indexOf(')');

            let openB = code.indexOf('{');
            let closeB = code.lastIndexOf('}');

            let invocation = spaceSplit[spaceSplit.length-1].slice(0, spaceSplit[spaceSplit.length-1].indexOf('('));
            let param = code.slice(openP+1, closeP);
            let evalCode = code.slice(openB+1, closeB).trim();
            let arg = spaceSplit[spaceSplit.length-1].slice(openCP + 1, closeCP);
            //console.log(arg);
            //console.log('Param:', param, 'eval:', evalCode);
            //console.log(invocation);
            /*
function timesTwo (num) {
    return num * 2;
}

console.log(timesTwo(5));
            */

            // console.log(JSON.parse(JSON.stringify(code)));
            if(spaceSplit.length === 1) {
                if(splitCode[0] === 'const') disperseVals.declarations = `Constant Variable: ${splitCode[1]} ${splitCode[2]} ${splitCode[3]}`;
                if(splitCode[0] === 'let') disperseVals.declarations = `Enclosed Block Variable: ${splitCode[1]} ${splitCode[2]} ${splitCode[3]}`;
                if(splitCode[0] === 'var') disperseVals.declarations = `Function Block Variable: ${splitCode[1]} ${splitCode[2]} ${splitCode[3]}`;
            }

            else if (spaceSplit[spaceSplit.length-1].indexOf(invocation) >= 0) {
                if(splitCode[0] === 'function' || code.indexOf('=>') >= 0) {
                    console.log('RUNNING');
                    const res = new Function(param, evalCode);
                    disperseVals.declarations = `Function: ${splitCode[1]}`
                    disperseVals.funcDeclarations = `${splitCode[1]}(${arg})`;
                    disperseVals.value = `${splitCode[1]} returns => ${res(JSON.parse(arg))}`;
                    disperseVals.funcBody = evalCode;
                    disperseVals.funcMem = `${param} = ${arg}`;
                    disperseVals.invoked = true;
                } else {
                    disperseVals.codeBlock = `${spaceSplit[0]}`;
                    disperseVals.declarations = `Constant: ${splitCode[1]}`;
                    disperseVals.value = splitCode[3][0];
                }
                
            }


            // } else {
            //     disperseVals.codeBlock = JSON.parse(JSON.stringify(code));
            // }
            // if(spaceSplit.length > 1) {
            //     if(splitCode[0] === 'const') disperseVals.declarations = `Constant Func. Variable: ${splitCode[1]} ${splitCode[2]} ${splitCode[3]}`;
            //     if(splitCode[0] === 'var') disperseVals.declarations = `Func. Variable: ${splitCode[1]} ${splitCode[2]} ${splitCode[3]}`;

            //     disperseVals.codeBlock += spaceSplit.slice(0, lastIndex+1).join(''); // setting up code block;
            //     let conLog = `console.log(${splitCode[1]})`;
            //     if(spaceSplit[spaceSplit.length-1] === conLog) disperseVals.value = `${splitCode[4]}`;

            //     if(spaceSplit[spaceSplit.length-1].length > conLog.length) {
            //         disperseVals.declarations = `Function Declared: ${splitCode[1]} ${splitCode[2]}`;
            //         disperseVals.funcDeclarations = `${splitCode[1]}${splitCode[2]}`;
            //         //Grabs body of function and trims it;
            //         let funcBody = spaceSplit[1].trim();

            //         //detect Open and Closing Parens at the console.log;
            //         let open = spaceSplit[spaceSplit.length-1].lastIndexOf('(');
            //         let closed = spaceSplit[spaceSplit.length-1].indexOf(')');
            //         let arg = spaceSplit[spaceSplit.length-1].substring(open+1, closed);

            //         if(splitCode.indexOf('function') >= 0) {
            //             //created new function called using param => spaceSplit[0];
            //             //funcBody => spaceSplit[1];
            //             let param = splitCode[2].replace(/[()]/g, '');
            //             const result = new Function(param, funcBody);
                        
            //             disperseVals.value = result(JSON.parse(arg));
            //         }
            //         if(splitCode.indexOf('=>') >= 0) {
            //             //created new function called using param => spaceSplit[0];
            //             //funcBody => spaceSplit[1];
            //             let param = splitCode[3].replace(/[()]/g, '');
            //             console.log(param);
            //             const result = new Function(param, funcBody);
                        
            //             disperseVals.value = result(JSON.parse(arg));
            //         }

            //     }
            // }

            declared = state.declared.slice();
            declared.push(disperseVals);

            return {
                ...state,
                declared,
            }
        case types.CLEAR_VISUALS:
            const clearedState = {
                code: '',
                declared: [],
            };
            return {
                ...clearedState
            }
        default:
            return state;
    }
}

export default mainReducer;