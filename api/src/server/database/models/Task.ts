export interface ITask {
  id: number;
  type: number;
  title: string;
  createdAt: Date;
}

export interface ITaskTypeAsString extends Omit<ITask, 'type'> {
  type: string;
}
