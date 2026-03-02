const db = require("../database/knex");

exports.findByUsername = async (username) => {
  return db("sa_user").where({ username }).first();
};

exports.createUser = async (user) => {
  const created = await db("sa_user")
    .insert(user)
    .returning("*");

  return created;
};