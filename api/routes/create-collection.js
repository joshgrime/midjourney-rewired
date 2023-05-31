function createCollection(db, data) {
    return new Promise(function(resolve, reject){
        var d = new Date();
        var id = d.getTime();

        var obj = { id: id, title: data.title, parent: data.parent, children: [] };
        db.get('collections').push(obj).write();

        var parent = db.get(data.parentType).find(({id: data.parent}));
        var parentid = parent.value();
        console.log('Creating a collection: '+data.parentType);
        console.log('Parent is ')
        console.log(parentid);
        parentid.children.push(id);
        parent.set('children', parentid.children).write();

        resolve({result:'success', data: obj});
    });
}

module.exports = createCollection;