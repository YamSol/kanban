import { ITask } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    task: ITask;
  }
}
