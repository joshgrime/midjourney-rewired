function getCollection(db, data) {
    return new Promise(function(resolve, reject){
        console.log('Getting an item with id: '+data.id+', it\'s a '+data.type);
        var payload = db.get(data.type).find(({id: data.id})).value();
        console.log(payload);
        resolve({result:'success', data: payload});
    });
}

module.exports = getCollection;