const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
   const tablet1 = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet1.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet1.loadFile('tablet1.html');


   const tablet2 = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet2.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet2.loadFile('tablet2.html');


   const tablet3 = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet3.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet3.loadFile('tablet3.html');


   const tablet4 = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet4.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet4.loadFile('tablet4.html');


   const tablet5 = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet5.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet5.loadFile('tablet5.html');


   const tablet6 = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
         nodeIntegration: true,
         contextIsolation: false
      }
   });
   tablet6.webContents.on('select-bluetooth-device', (event, devices, callback) => {
      event.preventDefault()

      if (devices && devices.length > 0) {
         callback(devices[0].deviceId)
      }
   });
   tablet6.loadFile('tablet6.html');
}

app.whenReady().then(() => {
   createWindow();

   app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
});

app.on('window-all-closed', function () {
   app.quit();
});


