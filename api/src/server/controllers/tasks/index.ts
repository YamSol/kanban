import * as create from "./Create";
import * as getAll from "./getAll";
import * as getOne from "./getOne";
import * as Delete from "./Delete";
import * as update from "./Update";

export const TarefasController = {
    ...create,
    ...getAll,
    ...getOne,
    ...Delete,
    ...update,
};
