const productRepo = require("../../infrastructure/repositories/product.repository");

class UpdateProductUsecase {
  async execute(id, data) {
    const product = await productRepo.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    return await productRepo.update(id, {
      ...data,
      updated_at: new Date(),
    });
  }
}

module.exports = new UpdateProductUsecase();
