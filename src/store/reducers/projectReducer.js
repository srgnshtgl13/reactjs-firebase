import { CREATE_PROJECT, CREATE_PROJECT_ERROR } from '../actions/types'

const initialState = {
    projects: [
        {id:'1',title:'project-1',content:'blah blah'},
        {id:'2',title:'project-2',content:'blah blah blah'},
        {id:'3',title:'project-3',content:'blah blahblah blah'}
    ],
    responseError: null
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            //console.log("Project Created!");
            return {...state, responseError: null}
        case CREATE_PROJECT_ERROR:
            //console.log("Create project Error! => ",action.err);
            return {...state, responseError: action.err}
        default:
            return state;
    }
    
}

export default projectReducer;