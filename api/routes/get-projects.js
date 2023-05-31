function getProjects(db) {
    return new Promise(function(resolve, reject){
        console.log('Getting projects')
        var payload = db.get('projects').value();
        console.log(payload);
        resolve({result:'success', data: payload});
    });
}

module.exports = getProjects;