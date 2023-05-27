import './App.css';
import React from 'react';
import { useState } from 'react';
import Helppanel from './components/Helppanel';
import Sidepanel from './components/Sidepanel';

import Home from './pages/Home';
import ImageView from './pages/ImageView';

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
            home: <Home navTo={navTo} />,
            imageview: <ImageView navTo={navTo} />
            } [view]}
        </div>
      </div>
    </div>
  );
}

export default App;
