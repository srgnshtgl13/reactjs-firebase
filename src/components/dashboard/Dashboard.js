import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'; // because we don't want to playing with every collection just we need the projects collection
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';

class Dashboard extends React.Component {
    render() {
        const { projects,notifications } = this.props;
        if(!this.props.auth.uid) return <Redirect to="/signin" />;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications} />
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => ({
//     projects: state.firestore.ordered.projects
// })
const mapStateToProps = (state) => {
    console.log("From Dashboard: ",state);
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }

}


/**
 * to compose different high order component together we need to use compose like we did in index.js
 * so we will use connect also firestoreConnect together
 */
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Dashboard);
/**
 * so what this is gonna say? When this component is active the collection that i want to listen is the projects collection
 * when ever this component is first loads or is changed in the database online this will induce(uyarmak) the firesoreReducer
 * to sync the store state with that projects collection in firestore so when ever the database's changed or a new item is added
 * or deleted or updated this component will here that. So it means the changes will reflected and the reducer will be updated
 */
