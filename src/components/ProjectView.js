import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';

function ProjectView({levelDeeperCallback}){
    const [projects, setProjects] = useState([]);

    //get existing projects on initialisation
    useEffect(()=>{
        makeRequest(null, 'get-projects', (data) => {
            console.log(data);
            setProjects(data.data);
        });
    }, []);

    function addProject(name) {
        var obj = {
            title: name
        }
        makeRequest(obj, 'create-project', (data) => {
            if (data.result === 'success') {
                var p = [...projects];
                p.push(data.data);
                setProjects(p);
            }
        });
    }
    
    function deleteProject(id) {
        var obj = {
            id: id
        }
        makeRequest(obj, 'delete-project', (data) => {
            if (data.result === 'success') {
                var p = projects.filter(project => {return project.id !== id});
                setProjects(p);
            }
        });
    }

    var projectMap = projects.map(project => {
        return  <div key={project.id} className='sidebar-project'>
                    <div onClick={()=>{levelDeeperCallback(project.id, project.title, project.children)}}>{project.title}</div>
                    <div onClick={()=>{deleteProject(project.id)}}>Delete</div>
                </div>
    });

    return(
        <div>
            {projectMap}
            <AddProjectModal addProjectCallback={addProject} />
        </div>
    )
}

function AddProjectModal(props){

    const [name, setName] = useState('');
    const [active, setActive] = useState(false);

    function toggleActive() {
        setActive(!active);
    }

    function handleName(event) {
        setName(event.target.value);
    }

    function handleSubmit() {
        props.addProjectCallback(name);
        setActive(false);
    }
    

    if (active) {
        return(
            <div>
                <input onChange={handleName}></input>
                <div onClick={handleSubmit}>Confirm</div>
                <div onClick={toggleActive}>Cancel</div>
            </div>
        )

    }

    else {
        return(
            <div>
                <div onClick={toggleActive}>Add Project</div>
            </div>
        )
    }
}

export default ProjectView;