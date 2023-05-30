const { ipcMain } = require('electron');
const routes = require('./routes');

ipcMain.on('port', (event) => {
  
    const port = event.ports[0]

    port.on('message', (event) => {
      var command = getCommand(event.data);
      command(event.data).then(result => {
        port.postMessage({ data: result })
      });
    });

    port.start();
    
})

function getCommand(data) {
    switch (data.route) {
      case 'create-project':
        return routes.createProject(data);
    }
}

ipcMain.on('create-project', (event) => {

  console.log(routes);
  
  const port = event.ports[0]
  const [replyPort] = event.ports
  routes.createProject(event.data).then(result => {
    replyPort.postMessage({ data: result })
  });
  replyPort.close()

  port.start();
  
})