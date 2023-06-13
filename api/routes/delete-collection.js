function deleteCollection(db, data) {
    return new Promise(function(resolve, reject){
        console.log('Deleting item '+data.id+', it\'s parent is a '+data.parentType+' and the parent is '+data.parent);
        db.get('collections')
        .remove({ id: data.id })
        .write()

        var parent = db.get(data.parentType).find(({id: data.parent}));
        parentid = parent.value();
        
        console.log('Found the parent? Searched for '+data.parent);
        console.log(parentid);

        var removeFromChildren = parentid.children.filter(child => {
            return child !== data.id;
        });
        parent.set('children', removeFromChildren).write();
        
        resolve({result:'success', data: data.id});



    });
}

module.exports = deleteCollection;