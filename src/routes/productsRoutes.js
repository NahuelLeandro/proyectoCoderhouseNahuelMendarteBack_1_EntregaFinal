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

const { 
    getAllProducts, 
    getProductById,
    createProduct, 
    updatedProductById, 
    deleteProductById 
} = require("../controllers/productController.js")

router.get("/" , getAllProducts )
router.get("/:pid", getProductById)
router.post("/" , createProduct)
router.put("/:pid", updatedProductById)
router.delete("/:pid" , deleteProductById)
console.log("✅ productsRoutes cargado");
module.exports = router;