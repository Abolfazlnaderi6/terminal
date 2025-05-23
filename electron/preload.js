const { contextBridge, ipcRenderer } = require("electron")

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  clearTerminal: () => ipcRenderer.send("clear-terminal"),
  onClearTerminal: (callback) => ipcRenderer.on("clear-terminal", callback),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
})
