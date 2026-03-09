const db = require("../../../../shared/database/knex");

exports.findByUsername = async (username) => {
  return db("sa_user").where({ username }).first();
};

exports.findById = async (id) => {
  return db("sa_user").where({ rowguid: id }).first();
};

exports.getAllUsers = async () => {
  return db("sa_user").select("*");
};

exports.createUser = async (user) => {
  const created = await db("sa_user")
    .insert(user)
    .returning("*");

  return created[0];
};

exports.updateUser = async (id, data) => {
  const updated = await db("sa_user")
    .where({ rowguid: id })
    .update(data)
    .returning("*");

  return updated[0];
};

exports.deleteUser = async (id) => {
  const deleted = await db("sa_user")
    .where({ rowguid: id })
    .del();

  return deleted > 0;
};
