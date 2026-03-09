const db = require("../../../../shared/database/knex");

exports.findAll = async () => {
  return db("product").select("*");
};

exports.findById = async (id) => {
  return db("product").where({ id }).first();
};

exports.findBySku = async (sku) => {
  return db("product").where({ sku }).first();
};

exports.create = async (productData) => {
  const created = await db("product")
    .insert(productData)
    .returning("*");
  return created[0];
};

exports.update = async (id, productData) => {
  const updated = await db("product")
    .where({ id })
    .update(productData)
    .returning("*");
  return updated[0];
};

exports.delete = async (id) => {
  const deleted = await db("product")
    .where({ id })
    .del();
  return deleted > 0;
};
