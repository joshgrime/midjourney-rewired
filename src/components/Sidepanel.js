import React, { useState, useEffect } from 'react';
import ProjectView from './ProjectView';
import CollectionView from './CollectionView';

function Sidepanel(){

    var [currentView, setCurrentView] = useState('/projects');
    var [depth, setDepth] = useState(0);
    var [viewName, setViewName] = useState('Projects');
    var [idHold, setidHold] = useState([]);
    var [parent, setParent] = useState(null);

    function levelDeeper (id, title, children) {
        console.log('Going a level deeper:');

        console.log(id);
        console.log(title);
        console.log(children);
        setParent(id)
        setCurrentView(currentView + '/' + id)
        setDepth(depth + 1);
        setViewName(title);
        setidHold(children);
    }

    function determineView(view, depth) {

        if (depth === 0) return <ProjectView levelDeeperCallback={levelDeeper} />
        else {
            return <CollectionView init={idHold} parent={parent} depth={depth} levelDeeperCallback={levelDeeper} />
        }
    
    }

    const view = determineView(currentView, depth);

    return (
        <div className="app-panel side-panel">
            <div className="app-panel-header">{viewName}</div>
            {view}
        </div>
    )

}



export default Sidepanel;