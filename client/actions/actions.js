import * as types from '../constants/actionTypes';

export const setCode = (code) => ({
    type: types.SET_CODE,
    payload: code,
});

export const run = (code) => ({
    type: types.RUN_EDITOR,
    payload: code,
});

export const clear = () => ({
    type: types.CLEAR_VISUALS,
});