const {app, BrowserWindow, ipcMain, dialog} = require("electron");
const path = require("path");


let mainWindow;
const initialize = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  // mainWindow.webContents.openDevTools();
  mainWindow.loadFile("index.html")
}


const select_file = async () => {
  const file = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [{extensions: ["jpg", "png", "jpeg", "gif"]}]
  })
  if(!file.canceled) {
    return file.filePaths[0]
  }
  return null
}

app.whenReady().then(() => {

  ipcMain.handle("open-file", async () => {
    return select_file();
  });


  // this code Receive data to rendererProcessor
  ipcMain.on('share-data', (event, message) => {
    console.log('Received message from renderer:', message);
    // this code send data to rendererProcessor
    mainWindow.webContents.send("send-data", {message: "Hello from main Process!"});
    console.log(' Message send Successfully', message);
  });

  initialize(); // Create the browser window.

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  })

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      initialize();
    }
  })
});