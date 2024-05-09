import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(ETableNames.tasks).del();

  // Inserts seed entries
  await knex(ETableNames.tasks).insert([
    { type: 3, createdAt: new Date(), title: 'Criar Rotas da API' },
    { type: 0, createdAt: new Date(), title: 'Montar interface frontend' },
    { type: 2, createdAt: new Date(), title: 'Criar database' },
    { type: 1, createdAt: new Date(), title: 'Configurar autenticação de usuário' },
    { type: 2, createdAt: new Date(), title: 'Implementar CRUD para usuários' },
    { type: 3, createdAt: new Date(), title: 'Testar endpoints da API' },
    { type: 0, createdAt: new Date(), title: 'Estilizar página de login' },
    { type: 1, createdAt: new Date(), title: 'Implementar funcionalidade de upload de arquivos' },
    { type: 3, createdAt: new Date(), title: 'Otimizar desempenho da API' },
    { type: 2, createdAt: new Date(), title: 'Realizar backup do banco de dados' },
  ]);

  console.log('Seed data inserted into tasks table.');
}
