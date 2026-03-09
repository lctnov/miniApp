const db = require("../../../../shared/database/knex");

exports.findByUsername = async (username) => {
  return db("sa_user").where({ username }).first();
};

exports.findById = async (id) => {
  return db("sa_user").where({ rowguid: id }).first();
};

exports.createUser = async (user) => {
  const created = await db("sa_user")
    .insert(user)
    .returning("*");

  return created[0];
};
