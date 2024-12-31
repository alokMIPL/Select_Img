1. > npm init

> npm 

> npm install -D electron

> create `main.js` file the entry point of the app
> in place of `  "main": "index.js",` in `package.json` file write `"main": "main.js"`
  write some code and console it

> To run main.js make changes in package.json
  `"start": "electron ."`

> Now run the app with `npm run start`

> To create a `index.html` for UI
> In index.html write basic boiler code for some UI. 

> Now Open `main.js` and write the following code to load the `index.html` file

```javascript
const {app, BrowserWindow} = require("electron");

const initialize = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadFile("index.html")
}

app.whenReady().then(() => {
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
})

```

> Now run the app with `npm run start`

> Now we have a simple electron app with a UI.

> Now we need to connect `main.js` and `index.html` and for this we need `preload.js` file.

> Create `preload.js` file and write the following code in it.

```javascript
const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
}



if we use .send in preload then in main.js use .on in ipcMain
if we use .invoke in preload then in main.js use .handle in ipcMain