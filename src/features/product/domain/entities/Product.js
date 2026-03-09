// Product Entity - represents the core domain object
class Product {
  constructor(id, name, description, price, stock, sku) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.sku = sku;
  }

  isOutOfStock() {
    return this.stock <= 0;
  }

  reduceStock(quantity) {
    if (quantity > this.stock) {
      throw new Error("Insufficient stock");
    }
    this.stock -= quantity;
  }
}

module.exports = Product;
