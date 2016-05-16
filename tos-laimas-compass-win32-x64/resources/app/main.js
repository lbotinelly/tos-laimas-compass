'use strict';

//Bootstrap
global.app = {
  constants: require('./assets/js/constants.js'),
  data: {},
  maps: {},
  settings: {}
};

require('./server.js');
require('./assets/js/socket.js');
require('./assets/js/data.js');
require('./assets/js/registry.js');

//Electron initialization

const electron = require('electron');
const electronApp = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL('http://localhost:' + app.constants.__SERVER_PORT + '/');

  //mainWindow.webContents.openDevTools();
  //mainWindow.setAlwaysOnTop(true);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

electronApp.on('ready', createWindow);

var gracefulShutdown = function () {
  console.log("Received kill signal, shutting down gracefully.");
  express.close(function () {
    console.log("Closed out remaining connections.");
    process.exit();
  });

  electronApp.on('window-all-closed', function () {

    gracefulShutdown();
    //if (process.platform !== 'darwin') {
    electronApp.quit();
    //}
  });

  electronApp.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });


  // if after 
  setTimeout(function () {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit()
  }, 5 * 1000);
}

// listen for TERM signal .e.g. kill 
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);   