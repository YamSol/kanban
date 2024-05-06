import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITaskTypeAsString } from '../../models';

export const getAll = async (): Promise<ITaskTypeAsString[] | Error> => {
  try {
    // get all tasks
    const result = await Knex(ETableNames.tasks).select();

    return result;
  } catch (error) {
    console.error('Error getting all tasks: ' + error);
    return new Error('Error getting all tasks: ' + error);
  }
};
