import {
    SELECTED_INGREDIENT_ON,
    SELECTED_INGREDIENT_OFF
} from "../actions/selected-ingredient";

const initSelectedIngredientState = {
    selected: false,
    ingredient: {}
}

export const selectedIngredient = (state = initSelectedIngredientState, action) => {
    switch (action.type) {
        case SELECTED_INGREDIENT_ON: {
            return {
                ingredient: action.ingredient,
                selected: true
            }
        }
        case SELECTED_INGREDIENT_OFF: {
            return {
                ingredient: {},
                selected: false
            }
        }
        default: {
            return state
        }
    }
}