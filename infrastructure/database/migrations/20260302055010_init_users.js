exports.up = async function (knex) {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  return knex.schema.createTable("sa_user", (table) => {
    table.bigIncrements("id").primary();

    table.string("username", 100).notNullable();
    table.string("email", 150).notNullable();
    table.string("password", 255).notNullable();
    table.boolean("is_active").defaultTo(true);

    table
      .uuid("rowguid")
      .notNullable()
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .unique();

    table.string("createby", 100);
    table.timestamp("createdate").defaultTo(knex.fn.now());

    table.string("modifyby", 100);
    table.timestamp("modifydate").defaultTo(knex.fn.now());

    // Unique constraint (Postgres tự tạo BTREE index)
    table.unique("username");
    table.unique("email");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sa_user");
};