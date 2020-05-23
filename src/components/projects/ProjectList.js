import React from 'react';
import ProjectSummary from './ProjectSummary';
import {Link} from 'react-router-dom';

const ProjectList = ({projects}) => {
    if(projects){
        return (
            <div className="project-list section">
                {projects && projects.map((project,index)=>{    // we might not have any project in the database that's why we did projects && projects...
                        return(
                            <Link to={`/project/${project.id}`} key={project.id}><ProjectSummary project={project} key={index} /></Link>
                        )
                    })
                }
            </div>
        )

    } else {
        return (
            <div className="container center">
                <p>Loading projects...</p>
            </div>
        )
    }
}

export default ProjectList;