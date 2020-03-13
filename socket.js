let io = require("socket.io");

module.exports = {
  init: httpServer => {
    return (io = io(httpServer));
  },
  getIo: () => {
    if (!io) throw new Error('Socket.io not initialized');
    return io;
  }
};
