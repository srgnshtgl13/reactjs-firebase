import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {SignInAction,ClearSigningErrorsAction} from '../../store/actions/authActions';

class Signin extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
        this.props.ClearSigningErrorsAction();
    }
    onSubmit = e => {
        e.preventDefault();
        // console.log(this.state);
        this.props.SignInAction(this.state);
    }
    renderButton(){
        if(!this.props.loading){
            return <button type="submit" className="btn purple darken-4 z-depth-0 waves-effect waves-light">
                    Login
                </button>
        }
        return <p>Loading</p>
        
    }
    
    render(){
        const {error, auth} = this.props;
        if(auth.uid) return <Redirect to="/" />; // <- if signed in then redirect to dashboard page
        return(
            <div className="container col s12 m4 l8">
                <form onSubmit={this.onSubmit} className="white card-panel">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.onChange} />
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

const mapStateToProps = state => {
    //console.log("From Signin: ",state)
        return {
            auth: state.firebase.auth,
            error: state.auth.error,
            loading: state.auth.loading
        }
}
export default connect(mapStateToProps,{SignInAction,ClearSigningErrorsAction})(Signin);

// const mapDispatchToProps = (dispatch) => {
//     // console.log(dispatch)
//     return {
//         signIn: (creds) => dispatch(SignInAction(creds))
//     }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Signin);