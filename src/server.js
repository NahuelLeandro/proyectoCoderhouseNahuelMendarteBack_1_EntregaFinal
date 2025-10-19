const express = require("express");
const http = require("http");
const path = require("path");
require("dotenv").config();

const indexRoutes = require("./routes/indexRoutes");
const { paths } = require("./config/config");

// Inicialización de app y server
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(paths.public));

// Configs
const connectMongo = require("./config/mongoConfig");
const setupHandlebars = require("./config/hbsConfig");
const initSocket = require("./config/socketConfig");

// Aplicar configuraciones
setupHandlebars(app, paths);
const io = initSocket(server);

// Conectar MongoDB
connectMongo(process.env.MONGO_URI);

// Rutas
app.use("/", indexRoutes);

// 404
app.use((req, res) => {
    console.log("❌ Ruta no encontrada:", req.method, req.url);
    res.status(404).send("Ruta no encontrada");
});

module.exports = { app, server };