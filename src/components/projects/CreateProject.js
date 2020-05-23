import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions';

class CreateProject extends Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        //console.log(this.state)
        this.props.createProject(this.state)
        this.setState({
            title: '',
            content: ''
        });
        if(this.props.responseError==null){
            this.props.history.push('/');
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render(){
        if(!this.props.auth.uid) return <Redirect to="/signin" />;
        return(
            <div className="container">
                <form onSubmit={this.onSubmit} className="white card-panel">
                    <h5 className="grey-text text-darken-3">Create new project</h5>
                    <div className="input-field">
                        <label htmlFor="content">Title</label>
                        <input type="text" id="title" onChange={this.onChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" cols="30" rows="10" onChange={this.onChange} className="materialize-textarea"></textarea>
                        
                    </div>
                    <div className="input-field">
                        <button className="btn purple darken-4 z-depth-0 waves-effect waves-light">
                            Create
                        </button>
                        <div className="red-text center">
                            { this.props.responseError ? <p>{this.props.responseError}</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     createProject: (project) => dispatch(createProject(project))
// })

// export default connect(null, mapDispatchToProps)(CreateProject);

const mapStateToProps = (state) => {
    console.log("From CreateProject.js",state)
    return {
        auth: state.firebase.auth,
        responseError: state.project.responseError
    }
}

export default connect(mapStateToProps, {createProject})(CreateProject);