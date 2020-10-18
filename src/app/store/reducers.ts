
import { Categoria } from '../models/category.model';
import * as actions from "./actions";

const initialState: Categoria = {
    nombre: '',
    imagen: '',
}

export function reducer(state: Categoria, action: actions.Actions) {
    switch (action.type) {
        case actions.SET_CATEGORY:
            return action.payload
        default:
            return state;
    }
}