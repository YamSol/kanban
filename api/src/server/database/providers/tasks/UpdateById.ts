import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

interface IBodyPropsTypeAsString {
  title?: string;
  createdAt?: Date;
  id?: number;
  type?: string;
}
export const updateById = async (task: IBodyPropsTypeAsString, id: number): Promise<any | Error> => {
  try {
  // update task
  const response = await Knex(ETableNames.tasks).update(task).where({id});
  
  return response;
  } catch (error) {
    console.log('Error updating task: ' + error);    
    return new Error('Error updating task: ' + error);    
  }
}