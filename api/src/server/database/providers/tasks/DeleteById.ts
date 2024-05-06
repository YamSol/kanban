import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<number | Error> => {
  try {
    // delete task. response is the number of deleted tasks (0 or 1)
    const response = await Knex('tasks').delete('*').where({ id });

    // response handling
    if (typeof response === 'number') {
      return response;
    } else if (typeof response === 'object'){
      return new Error('Error deleting task: ' + response);
    } else {
      return new Error('Error deleting task');
    }
  } catch (error) {
    return new Error('Error deleting task: ' + error);
  }
};
