function deleteProject(db, data) {
    return new Promise(function(resolve, reject){
        console.log('Deleting project')
        db.get('projects')
        .remove({ id: data.id })
        .write()
        resolve({result:'success', data: data.id});
    });
}

module.exports = deleteProject;