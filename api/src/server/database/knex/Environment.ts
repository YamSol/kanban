import { Knex } from 'knex';
import path from 'path';

export const production: Knex.Config = {
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: 'root',
    password: process.env.MYSQL__ROOT_PASSWORD,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },

};
