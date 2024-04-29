import * as create from "./Create";
import * as getAll from "./getAll";
import * as Delete from "./Delete";
import * as update from "./Update";



export const TarefasController = {
    ...create,
    ...getAll,
    ...Delete,
    ...update,
}
