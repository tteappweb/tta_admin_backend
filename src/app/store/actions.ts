import { Action } from "@ngrx/store";
import { Categoria } from '../models/category.model';
import { Slide } from '../models/slide-bienvenida.model';

export const SET_CATEGORY = "SET_CATEGORY";

export class SetCategory implements Action {
    readonly type = SET_CATEGORY
    constructor(public payload: Categoria) { }
}
export type Actions = SetCategory


export const SET_SLIDE = "SET_SLIDE";

export class SetSlide implements Action {
    readonly type = SET_SLIDE
    constructor(public payload: Slide) { }
}
export type ActionsSlide = SetSlide