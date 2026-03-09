const knex = require("knex");
const path = require("path");
const config = require(path.join(__dirname, "../../../knexfile"));

const environment = process.env.NODE_ENV || 'development';
module.exports = knex(config[environment]);
