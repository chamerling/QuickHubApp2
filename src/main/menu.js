const path = require('path');
const os = require('os');
const config = require('./config');
const utils = require('./utils');
const {app, shell, Menu, dialog} = require('electron');
const appName = app.getName();
const settingsURL = `file://${__dirname}/app/settings/index.html`;

module.exports = {
  create
};

function buildDefaultTemplate(mainWindow) {
  const viewSubmenu = [];

  if (process.platform !== 'darwin') {
    viewSubmenu.push({
      type: 'checkbox',
      label: 'Always on Top',
      accelerator: 'Ctrl+Shift+T',
      checked: true,//config.get('alwaysOnTop'),
      click(item, focusedWindow) {
        //config.set('alwaysOnTop', item.checked);
        focusedWindow.setAlwaysOnTop(item.checked);
      }
    });
  }

  const helpSubmenu = [
    {
      label: `${appName} Website`,
      click() {
        shell.openExternal(config.sources.repoUrl);
      }
    },
    {
      label: 'Report an Issue…',
      click() {
        const body = `
  <!-- Please succinctly describe your issue and steps to reproduce it. -->
  -
  ${app.getName()} ${app.getVersion()}
  Electron ${process.versions.electron}
  ${process.platform} ${process.arch} ${os.release()}`;

        shell.openExternal(`${config.sources.repoUrl}/issues/new?body=${encodeURIComponent(body)}`);
      }
    },
    {
      role: 'about',
      click() {
        dialog.showMessageBox({
          title: `About ${appName}`,
          message: `${appName} ${app.getVersion()}`,
          detail: 'Created by @chamerling'
        });
      }
    }
  ];

  const macosTemplate = [
    {
      label: appName,
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Preferences...',
          accelerator: 'Cmd+,',
          click() {
            mainWindow.loadURL(settingsURL);
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Log Out',
          click() {
            utils.sendAction('log-out');
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          role: 'hide'
        },
        {
          role: 'hideothers'
        },
        {
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'Cmd+Shift+O',
          click() {
          }
        }
      ]
    },
    {
      role: 'editMenu'
    },
    {
      role: 'window',
      submenu: [
        {
          role: 'minimize'
        },
        {
          role: 'close'
        },
        {
          type: 'separator'
        },
        {
          role: 'front'
        },
        {
          role: 'togglefullscreen'
        },
        {
          type: 'separator'
        },
        {
          type: 'checkbox',
          label: 'Always on Top',
          accelerator: 'Cmd+Shift+T',
          checked: true,//config.get('alwaysOnTop'),
          click(item, focusedWindow) {
            //config.set('alwaysOnTop', item.checked);
            focusedWindow.setAlwaysOnTop(item.checked);
          }
        }
      ]
    },
    {
      role: 'help',
      submenu: helpSubmenu
    }
  ];

  const otherTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Log Out',
          click() {
            utils.sendAction('log-out');
          }
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          role: 'undo'
        },
        {
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          role: 'cut'
        },
        {
          role: 'copy'
        },
        {
          role: 'paste'
        },
        {
          role: 'delete'
        },
        {
          type: 'separator'
        },
        {
          role: 'selectall'
        },
        {
          type: 'separator'
        },
        {
          label: 'Preferences',
          accelerator: 'Ctrl+,',
          click() {
            mainWindow.loadURL(settingsURL);
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: viewSubmenu
    },
    {
      role: 'help',
      submenu: helpSubmenu
    }
  ];

  return process.platform === 'darwin' ? macosTemplate : otherTemplate;
}

function create(mainWindow) {
  return Menu.buildFromTemplate(buildDefaultTemplate(mainWindow));
}

