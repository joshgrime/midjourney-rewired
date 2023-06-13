function stopExperiment(db, data) {
    return new Promise(function(resolve, reject){
        var d = new Date();
        var time = d.getTime();
        var experiment = db.get('experiments').find({id: data.id}).value();
        experiment.set('endTime', time).write();
        resolve({result:'success'});
    });
}

module.exports = stopExperiment;