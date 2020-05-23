import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {SignOutAction} from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    // console.log("Signed in",props)
    
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">New Project</NavLink></li>
            <li><a href="/#" onClick={props.SignOutAction}>Sign Out</a></li>
            <li><NavLink to="/" className="btn btn-floating purple darken-4 waves-effect">{props.profile.initials}</NavLink></li>
        </ul>
    )
}

export default connect(null,{SignOutAction})(SignedInLinks);