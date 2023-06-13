import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';

function PromptHistory(props){

    const [prompts, setPrompts] = useState([]);

    useEffect(()=> {
        console.log(props.prompts);
        setPrompts(props.prompts);
    }, [props.prompts]);

    var promptMap = prompts.map(prompt => {
        return (
        <div className='prompt-history-entry'>
            <div className='prompt-history-entry-square-bracket'>{'['}</div>
            <div className='prompt-history-entry-created'>{prompt.created}</div>
            <div className='prompt-history-entry-square-bracket'>{']'}</div>
            <div className='prompt-history-entry-prompt'>{prompt.prompt}</div>
        </div>
    )
    });

    return (
    <div className='prompt-history-container'>
        {promptMap}
    </div>
    )
}

export default PromptHistory;