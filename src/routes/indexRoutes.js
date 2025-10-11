
const express = require("express");
const router = express.Router();

const productsRouter = require("./productsRoutes");
const cartsRouter = require("./cartRoutes");

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

module.exports = router;