import dotenv from 'dotenv';
import { Knex } from 'knex';
import path from 'path';

dotenv.config();

export const production: Knex.Config = {
    client: 'mysql2',
    connection: {
      host: 'db',
      database: 'tasks',
      user: 'root',
      password: '123456',
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, '..', 'seeds'),
    },
};

export default production;