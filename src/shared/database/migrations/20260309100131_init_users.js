/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sa_user', function(table) {
    table.uuid('rowguid').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('username').unique().notNullable();
    table.string('email');
    table.string('password_hash').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.string('create_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sa_user');
};
