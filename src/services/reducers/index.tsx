import {combineReducers} from "redux";

import {allIngredients} from './all-ingredients';
import {order} from './order'
import {selectedIngredient} from './selected-ingredient'


export const rootReducer = combineReducers({
    allIngredients,
    order,
    selectedIngredient
})