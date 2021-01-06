const io = require('socket.io')({
  cors: {
    origin: 'http://localhost:9000',
    methods: ['GET', 'POST'],
  },
});
const { log } = require('./util');

class SocketServer {
  constructor(app) {
    log('green', 'socketServer starting...');
    this.app = app;
    io.on('connection', this.onConnection.bind(this));
    io.listen(3000);
  }

  onConnection(client) {
    log('green', 'socketServer.onConnection');

    client.on('message', message => {
      // track messages from client ...
      log('yellow', `message: ${JSON.stringify(message)}`);
      const { id, sentAt, type, data } = message;
      if (type === 'flush') {
        data.forEach(msg =>
          this.app.send({
            // id: client.id,
            id,
            sentAt,
            type: 'message',
            data: msg,
          }),
        );
      } else {
        this.app.send(message);
      }
    });

    client.on('disconnect', () => {
      // track discconection from client ...
      this.app.send({
        id: client.id,
        sentAt: Date.now(),
        type: 'dissconnect',
      });
    });
  }
}

module.exports = { SocketServer };
