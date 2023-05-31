function deleteCollection(db, data) {
    return new Promise(function(resolve, reject){
        console.log('Deleting collection')
        db.get('collections')
        .remove({ id: data.id })
        .write()
        resolve({result:'success', data: data.id});
    });
}

module.exports = deleteCollection;