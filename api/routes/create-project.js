function createProject(data) {
    return new Promise(function(resolve, reject){
    /* project
        - name
        - created
    */
        console.log('creating project');
        console.log(data);
        resolve([{name:'babby'}, {name:'joshy'}])

    });
}

module.exports = createProject;