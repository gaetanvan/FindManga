const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

if (require('electron-squirrel-startup')) return;
require('update-electron-app')()

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
    })
    ipcMain.handle('ping', () => 'pong')
    win.maximize()
    win.loadFile('index.html')
    win.once('ready-to-show', () => {
    })
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})