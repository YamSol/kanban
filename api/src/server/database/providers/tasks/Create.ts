import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITaskTypeAsString } from '../../models';

export const create = async (task: ITaskTypeAsString): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.tasks).insert(task).returning('id');

    // return id of created task
    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    } else {
      return new Error('Error creating task'); // unexpected response
    }
  } catch (error) {
    console.error('Error creating task: '+error);
    return new Error('Error creating task: '+error);
  }
};
