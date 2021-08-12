import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    DND_INGREDIENT
} from "../actions/burger-constructor-ingredients";

const initBurgerConstructorState = {
    ingredients: []
}

export const burgerConstructorIngredients = (state = initBurgerConstructorState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ingredients: [...state.ingredients, action.ingredient]
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                // @ts-ignore
                ingredients: state.ingredients.filter(ingredient => ingredient._id !== action.ingredient._id)
            }
        }
        case DND_INGREDIENT: {
            return {
                ...state
            }
        }
        default: {
            return state
        }
    }
}