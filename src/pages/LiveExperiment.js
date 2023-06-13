import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';

function LiveExperiment(props){

    const [loading, setLoading] = useState(false);
    const [prompts, setPrompts] = useState([]);

    useEffect(()=> {
        console.log(props.prompts)
        setPrompts(props.prompts)
    }, [props.prompts]);

    function stopExperiment() {        
        setLoading(true);

        makeRequest({id: props.experiment.id}, 'discord:stop-experiment', (data) => {
            props.stopExperimentCallback(data);
        });
    }

    var promptMap = prompts.map(prompt => {
        return <div>{prompt.prompt}</div>
    });

    return (
        <div>
            <div className='main-title'>You are experimenting</div>
            <div className='sub-title'>{props.experiment.title}</div>
            <div>{props.experiment.id}</div>
            <div onClick={stopExperiment}>End Experiment</div>
            <div className='content-divider-20'></div>
            {promptMap}
            
        </div>
    )
}

export default LiveExperiment;