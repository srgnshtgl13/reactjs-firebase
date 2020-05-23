import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from '../layouts/SignedInLinks';
import SignedOutLinks from '../layouts/SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
        const {auth,profile} = props;
        const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to="/" className="brand-logo">Home</Link>
                    {auth.isLoaded && links}
                </div>
            </nav>
        )
}

const mapStateToProps = (state) => {
    //console.log("From Navbar.js: ",state.firebase.profile)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);
