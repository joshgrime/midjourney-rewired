const { ipcMain } = require('electron');
const routes = require('./routes');

//initialise DB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ projects: [], collections: [], experiments: [] }).write();

function generateResponse(event, data, command) {
  const port = event.ports[0]
  const [replyPort] = event.ports
  command(db, data).then(result => {
    replyPort.postMessage(result);
    replyPort.close();
  });
  port.start();
}

for (let route of routes) {
  ipcMain.on(route.name, (event, data) => {
    generateResponse(event, data, route.func);
  })
};
