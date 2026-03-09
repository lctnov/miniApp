const productService = require("../../application/services/product.service");

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.locals.data = products;
      next();
    } catch (err) {
      next(err);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
      }
      res.locals.data = product;
      next();
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.locals.data = product;
      next();
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.updateProduct(id, req.body);
      if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
      }
      res.locals.data = product;
      next();
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const result = await productService.deleteProduct(id);
      if (!result) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        return next(error);
      }
      res.locals.data = { message: "Product deleted successfully" };
      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
