// ### 🧺 Endpoints de Carritos (`/api/carts`)
//
// | Método | Ruta                            | Función                                                |
// | ------ | ------------------------------- | ------------------------------------------------------ |
// | POST   | `/`                             | Crear nuevo carrito                                   |
// | GET    | `/:cid`                         | Obtener todos los productos del carrito               |
// | POST   | `/:cid/product/:pid`            | Agregar producto al carrito                           |
// | DELETE | `/:cid/products/:pid`           | Eliminar un producto específico del carrito           |
// | PUT    | `/:cid/products/:pid`           | Actualizar cantidad de un producto específico         |
// | PUT    | `/:cid`                         | Reemplazar el contenido completo del carrito          |
// | DELETE | `/:cid`                         | Vaciar completamente un carrito                       |

const express = require("express");
const router = express.Router();

const {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    updateProductQuantity,
    replaceCartProducts,
    clearCart
} = require("../controllers/cartsController.js");


router.post("/", createCart);// Crear nuevo carrito
router.get("/:cid", getCartById);// Obtener carrito por ID
router.post("/:cid/product/:pid", addProductToCart);// Agregar producto al carrito
router.delete("/:cid/products/:pid", deleteProductFromCart);// Eliminar producto específico del carrito
router.put("/:cid/products/:pid", updateProductQuantity);// Actualizar cantidad de un producto específico
router.put("/:cid", replaceCartProducts);// Reemplazar todo el contenido del carrito
router.delete("/:cid", clearCart);// Vaciar carrito completo



module.exports = router;