import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as update from './UpdateById';

export const TasksProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...update,
  ...deleteById,
};
