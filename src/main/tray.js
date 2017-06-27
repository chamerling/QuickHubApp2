const {app, Menu, Tray} = require('electron');
const utils = require('./utils');
const path = require('path');

function showOrRestore(window) {
  if (window.isMinimized()) {
    window.restore();
  } else {
    window.show();
  }
}

function create(win) {
  let tray = null;
  // template image https://github.com/electron/electron/blob/master/docs/api/native-image.md#template-image
  const iconPath = path.join(__dirname, 'assets/IconTrayTemplate.png');
  const toggleWin = () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  };

  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Log out',
      click() {
        utils.sendAction('log-out');
      }
    },
    {type: 'separator'},
    {role: 'quit'}
  ]);

  tray.setToolTip(`${app.getName()}`);
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleWin);

  return tray;
}

module.exports = {
  create
};
