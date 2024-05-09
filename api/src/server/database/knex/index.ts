import knex from 'knex';
import { production } from './Environment';

export const Knex = knex(production);
