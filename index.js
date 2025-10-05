const server = require("./src/server.js");

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});