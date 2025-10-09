// ### 🛒 Endpoints de Productos (`/api/products`)

// | Método | Ruta    | Función                                      |
// | ------ | ------- | -------------------------------------------- |
// | GET    | `/`     | Obtener todos los productos                  |
// | GET    | `/:pid` | Obtener producto por ID                      |
// | POST   | `/`     | Crear nuevo producto (ID se autogenera)      |
// | PUT    | `/:pid` | Actualizar campos del producto excepto el ID |
// | DELETE | `/:pid` | Eliminar producto por ID                     |



const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

router.get("/", productController.getAllProducts);
router.get("/:pid", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:pid", productController.updatedProductById);
router.delete("/:pid", productController.deleteProductById);

module.exports = router;