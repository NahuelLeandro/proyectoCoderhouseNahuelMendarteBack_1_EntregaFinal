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
const cartController = require("../controllers/cartController.js");

router.post("/", cartController.createCart);                       // Crear nuevo carrito
router.get("/:cid", cartController.getCartById);                   // Obtener carrito por ID (con populate)
router.post("/:cid/product/:pid", cartController.addProductToCart);// Agregar producto al carrito
router.delete("/:cid/products/:pid", cartController.deleteProductFromCart);// Eliminar producto específico
router.put("/:cid/products/:pid", cartController.updateProductQuantity);// Actualizar cantidad
router.put("/:cid", cartController.replaceCartProducts);           // Reemplazar todo el carrito
router.delete("/:cid", cartController.clearCart);                  // Vaciar carrito completo

module.exports = router;