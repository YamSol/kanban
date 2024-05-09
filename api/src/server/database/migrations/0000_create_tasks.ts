import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.tasks, (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.integer('type').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      // table.timestamp('updatedAt').defaultTo(knex.fn.now());
      // table.string('description').notNullable();
      // table.boolean('completed').notNullable().defaultTo(false);
    })
    .then(() => console.log(`Table ${ETableNames.tasks} created`));
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.tasks).then(() => console.log(`Table ${ETableNames.tasks} created`));
}
