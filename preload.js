// const { contextBridge, ipcRenderer } = require('electron');

// const renderer = {
//   openFile: async () => { 
//     // const file  = await ipcRenderer.invoke('open-file')
//     return await ipcRenderer.invoke('open-file',)
//   }
// }

// contextBridge.exposeInMainWorld('electron', 
//   {
    // renderer,
//     openFile: () => ipcRenderer.invoke('open-file'),
//   // this code send data to mainProcessor
//   shareData: (message) => ipcRenderer.send('share-data', message),
//   // this code Receive data to mainProcessor
//   ReceiveData: (message) => ipcRenderer.on('send-data', (event, data) => message(data)),
// }
// );



const { contextBridge, ipcRenderer } = require('electron');

// Define renderer object with functions
const renderer = {
  openFile: async () => {
    return await ipcRenderer.invoke('open-file');
  },

  // Send data to the main process
  shareData: (message) => ipcRenderer.send('share-data', message),

  // Listen for data from the main process
  ReceiveData: (message) => ipcRenderer.on('send-data', (event, data) => message(data)),
};

// Pass renderer to contextBridge
contextBridge.exposeInMainWorld('electron', renderer);
