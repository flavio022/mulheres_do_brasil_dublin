import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("sessionLocale", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("tel").notNullable();
    table.string("email").notNullable();
    table.string("value").notNullable();
    table.string("description").notNullable();
    table.string("image").notNullable();
    table
      .integer("organization_id")
      .notNullable()
      .references("id")
      .inTable("organizations")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("sessionLocale");
}
