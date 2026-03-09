const productRepo = require("../../infrastructure/repositories/product.repository");

class CreateProductUsecase {
  async execute(data) {
    const existing = await productRepo.findBySku(data.sku);
    if (existing) {
      throw new Error("Product with this SKU already exists");
    }

    return await productRepo.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      sku: data.sku,
      image_url: data.image_url || null,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}

module.exports = new CreateProductUsecase();
