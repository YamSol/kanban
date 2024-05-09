import knex from 'knex';
import { development, production, test } from './Environment';

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'PRODUCTION':
      return production;
    case 'TEST':
      return test;
    default: // 'DEVELOPMENT'
      return development;
  }
};

export const Knex = knex(getEnvironment());
