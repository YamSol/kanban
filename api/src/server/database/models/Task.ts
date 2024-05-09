export interface ITask {
  id: number;
  type: number;
  title: string;
  createdAt: Date;
}

export interface ITaskCreate {
  type: number;
  title: string;
}
