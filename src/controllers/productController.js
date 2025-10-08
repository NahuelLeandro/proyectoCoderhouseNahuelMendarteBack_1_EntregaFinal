const Product = require("../models/productModel.js");

// ✅ Obtener todos los productos
const getAllProducts = async (req, res) => {
  console.log("📩 Se llamó al endpoint GET /api/products/");
  try {
    const result = await Product.find();
    res.status(200).send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// ✅ Obtener producto por ID
const getProductById = async (req, res) => {
  console.log("📩 Se llamó al endpoint GET /api/products/:pid");
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).send({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).send({
      status: "success",
      payload: product,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// ✅ Crear un nuevo producto
const createProduct = async (req, res) => {
  console.log("📩 Se llamó al endpoint POST /api/products");

  const { title, description, price, category, stock, code, status, thumbnails } = req.body;

  try {
    const result = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      code,
      status,
      thumbnails,
    });

    res.status(201).send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

// ✅ Actualizar producto por ID
const updatedProductById = async (req, res) => {
  console.log("📩 Se llamó al endpoint PUT /api/products/:pid");
  const { pid } = req.params;
  const { title, description, price, category, stock, code, status, thumbnails } = req.body;

  try {
    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).send({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      pid,
      {
        title: title ?? product.title,
        description: description ?? product.description,
        price: price ?? product.price,
        category: category ?? product.category,
        stock: stock ?? product.stock,
        code: code ?? product.code,
        status: status ?? product.status,
        thumbnails: thumbnails ?? product.thumbnails,
      },
      { new: true } // devuelve el documento actualizado
    );

    res.status(200).send({
      status: "success",
      payload: updatedProduct,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

// ✅ Eliminar producto por ID
const deleteProductById = async (req, res) => {
  console.log("📩 Se llamó al endpoint DELET /api/products/:pid");
  const { pid } = req.params;

  try {
    const result = await Product.deleteOne({ _id: pid });

    if (result.deletedCount === 0) {
      return res.status(404).send({
        status: "error",
        message: "Producto no encontrado",
      });
    }

    res.status(200).send({
      status: "success",
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updatedProductById,
  deleteProductById,
};