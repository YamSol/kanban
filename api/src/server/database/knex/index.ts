import knex from 'knex';
import { production } from './Environment';

console.log('############################')
console.log(production);

export const Knex = knex(production);
