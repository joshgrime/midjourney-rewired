require('dotenv').config();
const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
require('../api');
/*
try {
  require('electron-reloader')(module)
} catch (_) {}
*/
function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 820,
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#16161f',
      symbolColor: '#fff',
      height: 40
    }
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(()=>{
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});