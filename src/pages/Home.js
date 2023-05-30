import React, { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function Home(props){

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        var obj = {
            name: 'babby project'
        }

        const makeStreamingRequest = (route, callback) => {
            // MessageChannels are lightweight--it's cheap to create a new one for each
            // request.
            const { port1, port2 } = new MessageChannel()
          
            // We send one end of the port to the main process ...
            ipcRenderer.postMessage(
              route,
              obj,
              [port2]
            )
          
            // ... and we hang on to the other end. The main process will send messages
            // to its end of the port, and close it when it's finished.
            port1.onmessage = (event) => {
                callback(event.data.data);
            }
            port1.onclose = () => {
              console.log('stream ended')
            }
          }
          
          makeStreamingRequest('create-project', (data) => {
            console.log('got response data:', data)
          })


    
    }, [])

    return (
    <div>
        <div>HELOOOOOOOOO</div>
        <div className="link" onClick={()=>{props.navTo('imageview')}}>Go to other page</div>
        <div>{projects.map(project=>{return <div>{project.name}</div>})}</div>
    </div>
    )
}

export default Home;