
const express = require("express");
const router = express.Router();

const productsRouter = require("./productsRoutes");
const cartsRouter = require("./cartRoutes");
const viewsRouter = require("./views");

// API
router.use("/api/products", productsRouter);
router.use("/api/carts", cartsRouter);

// Vistas
router.use("/", viewsRouter);

module.exports = router;