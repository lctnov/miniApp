const pool = require("../database/pgClient");

exports.save = async (userId, token, expiresAt) => {
  await pool.query(
    `INSERT INTO sa_refresh_token 
    (user_id, refresh_token, expires_at, create_by)
    VALUES ($1,$2,$3,$4)`,
    [userId, token, expiresAt, "system"]
  );
};

exports.find = async (token) => {
  const result = await pool.query(
    "SELECT * FROM sa_refresh_token WHERE refresh_token = $1",
    [token]
  );
  return result.rows[0];
};

exports.delete = async (token) => {
  await pool.query(
    "DELETE FROM sa_refresh_token WHERE refresh_token = $1",
    [token]
  );
};