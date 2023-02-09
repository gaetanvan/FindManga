const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const { autoUpdater } = require('electron-updater')

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration:true
        },
    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')
    win.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    })
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
});