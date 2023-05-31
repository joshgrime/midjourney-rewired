const { ipcRenderer } = window.require('electron');
const makeRequest = (data, route, callback) => {
    const { port1, port2 } = new MessageChannel()
    ipcRenderer.postMessage(route, data, [port2]);
    port1.onmessage = (event) => {
      callback(event.data);
    }
}

export default makeRequest;