import { CREATE_PROJECT, CREATE_PROJECT_ERROR } from './types';

export const createProject = (project) => {
    return (dispach,getState,{getFirebase,getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        // getState is the state which is in the CreateProject components what we use in mapStateToProps
        const profile = getState().firebase.profile;
        const authorUid = getState().firebase.auth.uid;

        if(project.title !== "" || project.content!==""){
            // if we use {...project} spread operator this is the same with project.title,project.content...
            firestore.collection('projects').add({
                ...project,
                authorFirstName:profile.firstName,
                authorLastName:profile.lastName,
                authorId:authorUid,
                createdAt:new Date()
            }).then(()=>{
                dispach({type:CREATE_PROJECT, project});
            }).catch((err)=>{
                dispach({type:CREATE_PROJECT_ERROR, err})
            })
        } else {
            dispach({type:CREATE_PROJECT_ERROR, err:"You shouldn't leave any field as empty!"})
        }
    }

}
