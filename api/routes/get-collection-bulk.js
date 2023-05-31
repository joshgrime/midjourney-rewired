function getCollectionBulk(db, data) {
    return new Promise(function(resolve, reject){
        console.log('Getting collections')
        var payload = [];
        for (let id of data.children) {
            let res = db.get('collections').find(({id: id})).value();
            payload.push(res);
        }
        resolve({result:'success', data: payload});
    });
}

module.exports = getCollectionBulk;