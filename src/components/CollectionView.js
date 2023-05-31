import React, { useState, useEffect } from 'react';
import makeRequest from '../utils/makeRequest';

function CollectionView({init, parent, depth, levelDeeperCallback}){
    const [collections, setCollections] = useState([]);

    //get existing collections on initialisation
    useEffect(()=>{
        console.log('Init is:');
        console.log(init);
        if (init.length > 0) {
            var obj = {
                children: init
            }
            console.log('Sending OBJ');
            console.log(obj);
            makeRequest(obj, 'get-collection-bulk', (data) => {
                console.log(data);
                setCollections(data.data);
            });
        }
        else {
            setCollections([]);
        }
    }, [init]);

    function addCollection(name) {
        var obj = {
            title: name,
            parent: parent,
            parentType: depth > 1 ? 'collections' : 'projects'
        }
        makeRequest(obj, 'create-collection', (data) => {
            if (data.result === 'success') {
                var p = [...collections];
                p.push(data.data);
                setCollections(p);
                console.log('Collections is now');
                console.log(collections);
            }
        });
    }
    
    function deleteProject(id) {
        var obj = {
            id: id
        }
        makeRequest(obj, 'delete-collection', (data) => {
            if (data.result === 'success') {
                var p = collections.filter(collection => {return collection.id !== id});
                setCollections(p);
            }
        });
    }

    var projectMap = collections.map(collection => {
        return  <div key={collection.id} className='sidebar-project'>
                    <div onClick={()=>{levelDeeperCallback(collection.id, collection.title, collection.children)}}>{collection.title}</div>
                    <div onClick={()=>{deleteProject(collection.id)}}>Delete</div>
                </div>
    });

    return(
        <div>
            {projectMap}
            <AddFolderModal addCollectionCallback={addCollection} />
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
        props.addCollectionCallback(name);
        setActive(false);
    }
    

    if (active) {
        return(
            <div>
                <input onChange={handleName}></input>
                <div onClick={handleSubmit}>Confirm</div>
                <div onClick={toggleActive}>Cancel</div>
            </div>
        )

    }

    else {
        return(
            <div>
                <div onClick={toggleActive}>Add Folder</div>
            </div>
        )
    }
}

export default CollectionView;