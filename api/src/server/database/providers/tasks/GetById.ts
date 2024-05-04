import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const getById = async (id: number) => {
  try {
    const [result] = await Knex(ETableNames.tasks).select('*').where({ id });
    // if (typeof result === 'object') {
    return result;
    // }
  } catch (error) {
    console.error('Error getting task by id:', error);
    return new Error('Error getting task by id');
  }
};
