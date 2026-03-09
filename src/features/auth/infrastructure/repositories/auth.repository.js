const db = require("../../../../shared/database/knex");

exports.save = async (userId, token, expiresAt) => {
  return await knex('sa_refresh_token').insert({
    user_id: userId,
    refresh_token: token,
    expires_at: expiresAt,
    create_by: "system",
  });
};

exports.find = async (token) => {
  return await knex('sa_refresh_token')
    .where({ refresh_token: token })
    .first();
};

exports.delete = async (token) => {
  return await knex('sa_refresh_token')
    .where({ refresh_token: token })
    .del();
};
