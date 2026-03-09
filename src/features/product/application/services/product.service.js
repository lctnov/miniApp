const productRepo = require("../../infrastructure/repositories/product.repository");

class ProductService {
  async getAllProducts() {
    return await productRepo.findAll();
  }

  async getProductById(id) {
    return await productRepo.findById(id);
  }

  async createProduct(data) {
    const createUsecase = require("../usecases/create-product.usecase");
    return await createUsecase.execute(data);
  }

  async updateProduct(id, data) {
    const updateUsecase = require("../usecases/update-product.usecase");
    return await updateUsecase.execute(id, data);
  }

  async deleteProduct(id) {
    return await productRepo.delete(id);
  }
}

module.exports = new ProductService();
