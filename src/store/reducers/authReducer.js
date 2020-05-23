import {SIGNIN_SUCCESS,SIGNIN_ERROR,SIGNOUT_SUCCESS, 
        CLEAR_SIGNING_ERRORS,
        SIGNUP_SUCCESS, SIGNUP_ERROR, PRESS_BUTTON
        } from '../actions/types';

const initialState = {
    error: null,
    loading: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_ERROR:
            // console.log("Login fail",action.payload)
            return {...state, error: action.payload, loading: false};
        case PRESS_BUTTON:
            return {...state, loading: true};
        case SIGNUP_SUCCESS:
        case CLEAR_SIGNING_ERRORS:
        case SIGNIN_SUCCESS:
            return {...state, error: null, loading: false};
        case SIGNOUT_SUCCESS:
            // console.log('Signout success');
            return state;
        case SIGNUP_ERROR:
            return {...state, error:action.err, loading:false}
        default:
            return state;
    }
}

export default authReducer;