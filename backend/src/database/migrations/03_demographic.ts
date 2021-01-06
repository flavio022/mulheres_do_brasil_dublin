import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("demographic", table => {
    table.increments("id").primary();
    table.string("genre").notNullable();
    table.string("country").notNullable();
    table.string("state").notNullable();
    table.integer("old").notNullable();
    table.string("profession").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("demographic");
}
