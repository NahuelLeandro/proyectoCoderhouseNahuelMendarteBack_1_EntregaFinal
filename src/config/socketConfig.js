const { Server } = require("socket.io");

function initSocket(server) {
    const io = new Server(server);

    io.on("connection", (socket) => {
        console.log(`🟢 Usuario conectado: ${socket.id}`);

        socket.on("disconnect", () => {
        console.log(`🔴 Usuario desconectado: ${socket.id}`);
        });
    });

    return io;
}

module.exports = initSocket;