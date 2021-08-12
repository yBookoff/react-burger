import {
    GET_ALL_INGREDIENTS_SUCCESS,
    GET_ALL_INGREDIENTS_REQUEST,
    GET_ALL_INGREDIENTS_ERROR
} from "../actions/all-ingredients";

const initAllIngredientsState = {
    allIngredientsList: [],
    ingredientsLoadRequest: false,
    ingredientsLoadError: false
}

export const allIngredients = (state = initAllIngredientsState, action) => {
    switch (action.type) {
        case GET_ALL_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsLoadRequest: true,
                ingredientsLoadError: false
            }
        }
        case GET_ALL_INGREDIENTS_SUCCESS: {
            return {
                allIngredientsList: action.payload,
                ingredientsLoadRequest: false,
                ingredientsLoadError: false
            }
        }
        case GET_ALL_INGREDIENTS_ERROR: {
            return {
                ...state,
                ingredientsLoadRequest: false,
                ingredientsLoadError: true
            }
        }
        default: {
            return state
        }
    }
}
