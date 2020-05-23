import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { SignUpAction } from '../../store/actions/authActions';

class Signup extends Component{
    state = {
        email:'',
        password:'',
        firstName:'',
        lastName:''
    }
    onSubmit = (e) => {
        e.preventDefault()
        //console.log(this.state)
        this.props.SignUpAction(this.state)

    }
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    renderButton(){
        if(!this.props.loading){
            return <button className="btn purple darken-4 z-depth-0 waves-effect waves-light">
                        Register
                    </button>
        }
        return <p>Loading...</p>
    }
    render(){
        const {error} = this.props;
        if(this.props.auth.uid) return <Redirect to="/"/>;
        return(
            <div className="container col s12 m4 l8">
                <form onSubmit={this.onSubmit} className="white card-panel">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        {this.renderButton()}
                        <div className="red-text center">
                            { error ? <p>{error}</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    // console.log(state)
    return {
        auth: state.firebase.auth,
        error: state.auth.error,
        loading: state.auth.loading
    }
}
export default connect(mapStateToProps,{SignUpAction})(Signup);