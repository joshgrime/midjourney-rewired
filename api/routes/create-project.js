function createProject(db, data) {
    return new Promise(function(resolve, reject){
    /* project
        - name
        - created
    */
        var d = new Date();
        var obj = { id: d.getTime(), title: data.title, children: [] };
        db.get('projects').push(obj).write();
        resolve({result:'success', data: obj});
    });
}

module.exports = createProject;