import { Action } from "@ngrx/store";
import { Categoria } from '../models/category.model';

export const SET_CATEGORY = "SET_CATEGORY";

export class SetCategory implements Action {
    readonly type = SET_CATEGORY
    constructor(public payload: Categoria) { }
}
export type Actions = SetCategory