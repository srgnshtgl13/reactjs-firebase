import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ProjectDetails = (props) => {
    // const id = props.match.params.id;   // we take this id from the route information
    const { project,auth } = props;
    if (project) {
        if(!auth.uid) return <Redirect to="/signin" />;
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>{project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <p>Loading...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // const id = props.match.params.id; // we have a problem in here. We don't have an access directly to props from here but we can use as second parameter this component's props as ownProps like below
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project: project,
        auth: state.firebase.auth
    }
}

// we did firestoreConnect because we want to get from firestore database only the projects collection
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);
