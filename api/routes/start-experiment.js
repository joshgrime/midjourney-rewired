function startExperiment(db, data) {
    return new Promise(function(resolve, reject){
        var d = new Date();
        var id = d.getTime();

        var obj = { id: id, title: data.name, parent: data.parent, prompts: [], startTime: id};
        db.get('experiments').push(obj).write();
        resolve({result:'success', data: obj});
    });
}

module.exports = startExperiment;