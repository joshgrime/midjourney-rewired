import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';

function DiscordBar(props){

    const [discordReady, setDiscordReady] = useState(false);
    const [discordFailed, setDiscordFailed] = useState(false);

    function connectToBot() {
        console.log('Making request to connect to disc');
        makeRequest(null, 'discord:connect-to-bot', (data) => {
            console.log(data);
            if (data === 'connected') {
                setDiscordReady(true);
            }
            else {
                //payload of prompt
                props.distributeDiscMessageCallback(data);
            }
        });

    }

    useEffect(()=> {

        //test Discord connection here.
        if (!discordReady && props.authed) {
            connectToBot();
        }

    }, [discordReady]);

    var text = discordReady ? 'Connected to Discord Bot' : discordFailed ? 'Unable to connect to bot' : 'Connecting to Discord bot...';

    return (
    <div className='discord-bar'>
        <div>{text}</div>
    </div>
    )
}

export default DiscordBar;