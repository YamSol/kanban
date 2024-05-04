import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const getAll = async () => {
  try {
    const [result] = await Knex(ETableNames.tasks).select('*').returning('*');
    return result;
  } catch (error) {
    console.error('Error getting all tasks:', error);
    return new Error('Error getting all tasks');
  }
};
