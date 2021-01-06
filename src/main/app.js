const { app, BrowserWindow } = require('electron');
const { SocketServer } = require('./socketServer');

const { log } = require('./util');

process.on('uncaughtException', function (error) {
  log('red', `*** ERROR! ***\n${error.stack}`);
});

class App {
  static run() {
    new App();
  }

  constructor() {
    log('blue', 'app.constructor');

    this.socketServer = new SocketServer(this);

    app.on('ready', this.onReady.bind(this));
    app.on('before-quit', this.onBeforeQuit.bind(this));
    app.on('before-reloaded', this.onBeforeQuit.bind(this));
  }

  onReady() {
    log('cyan', 'app.onReady');

    const browserWindow = new BrowserWindow({
      alwaysOnTop: true,
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        devTools: true,
        textAreasAreResizable: false,
      },
      show: false,
      darkTheme: true,
    });
    this.browserWindow = browserWindow;
    browserWindow.webContents.on(
      'did-finish-load',
      this.onDidFinishLoad.bind(this),
    );
    browserWindow.loadFile(`index.html`);
  }

  onDidFinishLoad() {
    log('cyan', 'app.onDidFinishLoad');

    this.browserWindow.show();
    this.browserWindow.webContents.openDevTools();
  }

  onBeforeQuit() {
    log('cyan', 'app.onBeforeQuit');
  }

  send(message) {
    log('cyan', `app.send: ${JSON.stringify(message)}`);
    // try {
    this.browserWindow.webContents.send('message', message);
    // } catch (e) {
    //   //
    // }
  }
}

module.exports = App;
