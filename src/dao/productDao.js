const Product = require("../models/productModel.js");

class ProductDAO {
    async getAll() {
        return await Product.find();
    }

    async getById(id) {
        return await Product.findById(id);
    }

    async create(data) {
        const newProduct = new Product(data);
        return await newProduct.save();
    }

    async updateById(id, data) {
        return await Product.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductDAO();