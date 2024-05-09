import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import knex from 'knex';
import { production } from '../knex/Environment';

export const config = knex(production);

console.log('8888888888888888888888');
console.log(knex);

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
