const { ipcMain } = require('electron');

//ICP ROUTES

// In the main process, we receive the port.
ipcMain.on('port', (event) => {
    // When we receive a MessagePort in the main process, it becomes a
    // MessagePortMain.
    const port = event.ports[0]
  
    // MessagePortMain uses the Node.js-style events API, rather than the
    // web-style events API. So .on('message', ...) instead of .onmessage = ...
    port.on('message', (event) => {
      // data is { answer: 42 }
      const data = event.data;
      console.log(data);
    })
  
    // MessagePortMain queues messages until the .start() method has been called.
    port.start()
})