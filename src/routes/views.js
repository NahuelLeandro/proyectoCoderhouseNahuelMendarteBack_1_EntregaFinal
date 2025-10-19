const express = require("express");
const router = express.Router();
const productService = require("../services/productService");
const cartService = require("../services/cartService");

// 🖼️ Vistas

// Home y Real Time Products
router.get("/", (req, res) => res.render("pages/home"));
router.get("/realTimeProducts", (req, res) => res.render("pages/realTimeProducts"));

// Lista de productos
router.get("/products", async (req, res) => {
    try {
        const productos = await productService.getAllProducts();
        res.render("pages/products", { productos });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los productos");
    }
});

// Detalle de producto
router.get("/products/:pid", async (req, res) => {
    try {
        const producto = await productService.getProductById(req.params.pid);
        res.render("pages/productDetail", { producto });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el producto");
    }
});

// Detalle de carrito
router.get("/carts/:cid", async (req, res) => {
    try {
        const carrito = await cartService.getCartById(req.params.cid);
        res.render("pages/cartDetail", { carrito });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el carrito");
    }
});

module.exports = router;