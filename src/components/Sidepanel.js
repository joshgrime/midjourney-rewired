import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';
import {ReactComponent as DeleteIcon} from '../icons/delete.svg';
import {ReactComponent as NewIcon} from '../icons/new.svg';
import {ReactComponent as CheckIcon} from '../icons/check.svg';
import {ReactComponent as ExperimentIcon} from '../icons/experiment.svg';
import {ReactComponent as BackIcon} from '../icons/back.svg';
import {ReactComponent as NewFolderIcon} from '../icons/new-folder.svg';


function Sidepanel(props){

    var [currentView, setCurrentView] = useState('/projects');
    var [depth, setDepth] = useState(0);
    var [currentTitle, setCurrentTitle] = useState('Projects');
    var [parent, setParent] = useState(null);
    var [currentid, setCurrentid] = useState(null);
    var [currentList, setCurrentList] = useState([]);

    //get existing projects on initialisation
    useEffect(()=>{
        makeRequest(null, 'get-projects', (data) => {
            setCurrentList(data.data);
            setCurrentid(null)
        });
    }, []);

    function openNewItem(id, direction) {
        var nDepth;

        if (direction === 'down') nDepth = depth + 1;
        else nDepth = depth - 1;

        setDepth(nDepth);
        
        //need to get the item first

        if (nDepth === 0) { //top-level, just get the projects
            makeRequest(null, 'get-projects', (data) => {
                setCurrentList(data.data);
                setCurrentid(null);
                setCurrentTitle('Projects');
                setCurrentView('/projects')
            });
        }
        else {
            //otherwise it's a collection
            var obj = {
                type: nDepth === 1 ? 'projects' : 'collections',
                id: id
            }
            makeRequest(obj, 'get-collection', (data) => {
                data = data.data;
                setCurrentid(id);
                setCurrentTitle(data.title);
                if (data.parent) setParent(data.parent);
                else setParent(null);

                if (direction === 'down') {
                    setCurrentView(currentView + '/' + data.title)
                }
                else {
                    var cViewSplit = currentView.split('/');
                    console.log(cViewSplit);
                    cViewSplit.length = cViewSplit.length - 1;
                    console.log(cViewSplit);
                    var nView = cViewSplit.join('/');
                    console.log(nView);
                    setCurrentView(nView);
                }

                //get names of children
                var obj = {
                    children: data.children
                }

                makeRequest(obj, 'get-collection-bulk', (data) => {
                    setCurrentList(data.data);
                });

            });
        }
    }

    function addFolder(name) {
        if (depth === 0) {
            //create a new project
            var obj = {
                title: name
            }
            makeRequest(obj, 'create-project', (data) => {
                if (data.result === 'success') {
                    var p = [...currentList];
                    p.push(data.data);
                    setCurrentList(p);
                }
            });
        }
        else {
            //create a collection
            console.log('Adding collection '+name+', the parent is: '+currentid);
        var obj = {
            title: name,
            parent: currentid,
            parentType: depth > 1 ? 'collections' : 'projects'
        }
        makeRequest(obj, 'create-collection', (data) => {
            if (data.result === 'success') {
                var p = [...currentList];
                p.push(data.data);
                setCurrentList(p);
            }
        });
        }
    }

    function deleteItem(id) {
        if (depth === 0) {
            //deleting a project
            var obj = {
                id: id
            }
            makeRequest(obj, 'delete-project', (data) => {
                if (data.result === 'success') {
                    var p = currentList.filter(project => {return project.id !== id});
                    setCurrentList(p);
                }
            });
        }
        else {
            //deleting a collection
            var obj = {
                id: id,
                parent: currentid,
                parentType: depth > 1 ? 'collections' : 'projects'
            }
            makeRequest(obj, 'delete-collection', (data) => {
                if (data.result === 'success') {
                    var p = currentList.filter(list => {return list.id !== id});
                    setCurrentList(p);
                }
            });
        }

    }

    var backTray = <div className='mini-icon back current-view-hold' onClick={()=>{openNewItem(parent, 'up')}}><BackIcon /><div className='current-view-text'>{currentView}</div></div>;

    var className = depth === 0 ? 'project' : 'folder';

    var listMap = currentList.map(item => {
        return  <div key={item.id} className={'sidebar-'+className} onClick={()=>{openNewItem(item.id, 'down')}}>
            <div className={'sidebar-'+className+'-link'}>{item.title}</div>
            <div className='icon-tray-inline' onClick={()=>{deleteItem(item.id)}}>
                <div className='mini-icon delete'><DeleteIcon /></div>
            </div>
        </div>
    });

    return (
        <div className="app-panel side-panel">
            <div className="app-panel-header">{currentTitle}</div>
            {depth > 0 ? backTray : null}
            {listMap}
            <AddFolderModal addFolderCallback={addFolder} navTo={props.navTo} depth={depth} />
        </div>
    )

}

function AddFolderModal(props){

    const [name, setName] = useState('');
    const [active, setActive] = useState(false);

    function toggleActive() {
        setActive(!active);
    }

    function handleName(event) {
        setName(event.target.value);
    }

    function handleSubmit() {
        props.addFolderCallback(name);
        setActive(false);
    }
    

    var input = active ?
            <div>
                <input className='new-folder-confirm-input' onChange={handleName}></input>
                <div className='new-folder-confirm'>
                    <div className='mini-icon delete' onClick={toggleActive}><DeleteIcon /></div>
                    <div className='mini-icon check' onClick={handleSubmit}><CheckIcon /></div>
                </div>
            </div> : null;
        
        var text = props.depth === 0 ? 'New Project' : 'New Folder';
        var icon = props.depth === 0 ? <NewIcon /> : <NewFolderIcon />;
        var experimentHtml = props.depth === 0 ? null : <div className='mini-icon experiment' ><ExperimentIcon onClick={()=>{props.navTo('newExperiment')}} alt='New Experiment' /></div>;

        return(
            <div>{input}
            <div className='new-folder-controls'>
                <div className='icon-tray'>
                    <div className='mini-icon new' onClick={active ? null : toggleActive}>{icon}</div>
                    {experimentHtml}
                </div>
            </div>
            </div>
        )
}



export default Sidepanel;