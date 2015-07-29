var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
//var s = require('./getSongs.js');
var fs = require("fs");
var Glob = require("glob");
//var Player = require('player');
var Meta = require("musicmetadata")
var Smoke = require('smokesignal');
// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var db = null;
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OSX it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  fs.exists("./cappella.db",function(exists){
    if(!exists){
      var db = require('./public/db.js');
      db.migrate().then(function(){
        mainWindow.loadUrl('file://' + __dirname + '/public/index.html');
      }).catch(console.error);
    }
    else
      mainWindow.loadUrl('file://' + __dirname + '/public/index.html');
  });
  // and load the index.html of the app.
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
