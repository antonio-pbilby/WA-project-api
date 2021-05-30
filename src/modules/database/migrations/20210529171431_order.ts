import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table.string('description', 150).notNullable();
    table.integer('quantity').notNullable();
    table.decimal('value', 10, 2).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
    table
      .integer('userId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('User')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('Order');
}
