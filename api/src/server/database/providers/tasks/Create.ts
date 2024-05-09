import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITaskCreate } from '../../models';

export const create = async (task: ITaskCreate): Promise<number | Error> => {
  try {
    // insert task into database and return it id
    const [response] = await Knex(ETableNames.tasks).insert(task).returning('id');

    // response handling
    if (typeof response === 'object') {
      return response.id;
    } else if (typeof response === 'number') {
      return response;
    } else {
      return new Error('Error creating task'); // unexpected response
    }
  } catch (error) {
    console.error('Error creating task: ' + error);
    return new Error('Error creating task: ' + error);
  }
};
