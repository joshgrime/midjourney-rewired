import './App.css';
import React from 'react';
import { useState } from 'react';
import Helppanel from './components/Helppanel';
import Sidepanel from './components/Sidepanel';

import Home from './pages/Home';
import ImageView from './pages/ImageView';

const { ipcRenderer } = window.require('electron');

const channel = new MessageChannel()
const app_port = channel.port1
const server_port = channel.port2
ipcRenderer.postMessage('port', null, [app_port]);

function App() {

  const [view, setView] = useState('home');

  function navTo(view) {
    setView(view);
  }

  return (
    <div className="App">
      <Sidepanel />
      <div className="main-cont">
        <Helppanel />
        <div className="app-panel main-panel">
          {{ //mini router
            home: <Home navTo={navTo} port={server_port} />,
            imageview: <ImageView navTo={navTo} port={server_port} />
            } [view]}
        </div>
      </div>
    </div>
  );
}

export default App;
