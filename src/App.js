import './App.css';
import React from 'react';
import { useState } from 'react';
import Helppanel from './components/Helppanel';
import Sidepanel from './components/Sidepanel';
import DiscordBar from './components/DiscordBar';
import PromptHistory from './components/PromptHistory';


import Home from './pages/Home';
import ImageView from './pages/ImageView';
import NewExperiment from './pages/NewExperiment';
import LiveExperiment from './pages/LiveExperiment';

function App() {

  const [view, setView] = useState('home');
  const [messages, setMessages] = useState([]);
  const [promptHistory, setPromptHistory] = useState([]);
  const [experiment, setExperiment] = useState({});
  const [experimentLive, setExperimentLive] = useState(false);

  function navTo(view) {
    setView(view);
  }

  function startExperiment(data) {
    setMessages([]);
    setExperiment(data.data);
    console.log('Starting experiment, data:');
    console.log(data);
    setExperimentLive(true);
    navTo('liveExperiment');
  }

  function stopExperiment() {
    setExperimentLive(false);
  }


  function distributeDiscMessage(m) {
    var _messages = messages;
    _messages.push(m);
    setMessages(_messages);

    var _promptHistory = promptHistory;
    if (_promptHistory.length === 200) _promptHistory.length = 199;
    _promptHistory.push(m);
    setPromptHistory(_promptHistory);
    console.log('Prompt history should now be: ');
    console.log(_promptHistory);
  }

  return (
    <div className="App">
      <div style={{display:'flex'}}>
        <Sidepanel navTo={navTo} />
        <div className="main-cont app-panel">
          <div className="main-panel">
            {{ //mini router
              home: <Home navTo={navTo} />,
              imageview: <ImageView navTo={navTo} />,
              newExperiment: <NewExperiment startExperimentCallback={startExperiment} />,
              liveExperiment: <LiveExperiment navTo={navTo} experiment={experiment} prompts={messages} stopExperimentCallback={stopExperiment} />
              } [view]}
          </div>
          
        </div>
      </div>
      <PromptHistory prompts={promptHistory} />
      <DiscordBar authed={true} distributeDiscMessageCallback={distributeDiscMessage} />
    </div>
  );
}

export default App;
