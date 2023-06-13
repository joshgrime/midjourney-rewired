import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';
function NewExperiment(props){

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');

    function startExperiment() {
        if (name.length === 0) return;
        
        setLoading(true);
        
        let obj = {
            name: name
        }
        makeRequest(obj, 'discord:start-experiment', (data) => {
            props.startExperimentCallback(data);
        });
    }

    function handleInput(e) {
        setName(e.target.value);
    }

    return (
        <div>
            <div className='main-title'>Start a new experiment</div>
            <div className='sub-title'>{props.path}</div>
            <div className='content-divider-20'></div>
            <div>Experiment Name: <input onChange={handleInput}></input></div>
            <div onClick={startExperiment}>Start Experiment</div>
            
        </div>
    )
}

export default NewExperiment;