const {BrowserWindow} = require('electron');

module.exports = {
  sendAction
};

function sendAction(action) {
  const [win] = BrowserWindow.getAllWindows();

  if (process.platform === 'darwin') {
    win.restore();
  }

  win.webContents.send(action);
}
