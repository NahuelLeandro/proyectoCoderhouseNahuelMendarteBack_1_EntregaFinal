require("dotenv").config();
const { app, server } = require("./src/server");
const PORT = process.env.PORT || 8080;

// Levantás SOLO el server, ya que Socket.IO está conectado a él
server.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}/realTimeProducts`);
});
