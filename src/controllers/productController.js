const Product = require("../models/productModel.js");

// ✅ Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

// ✅ Obtener producto por ID
const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Product.findById(pid);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

// ✅ Crear un nuevo producto
const createProduct = async (req, res) => {
    console.log("📩 Se llamó al endpoint POST /api/products");
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Producto creado con éxito", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

// ✅ Actualizar producto por ID
const updatedProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto actualizado", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// ✅ Eliminar producto por ID
const deleteProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updatedProductById,
  deleteProductById
};