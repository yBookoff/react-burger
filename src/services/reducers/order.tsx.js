import {
    GET_ORDER_NUM_SUCCESS,
    GET_ORDER_NUM_REQUEST,
    GET_ORDER_NUM_ERROR,
    ADD_ID_ORDER,
    ADD_BUN_ORDER,
    REMOVE_ID_ORDER,
    MODAL_ORDER_ON,
    MODAL_ORDER_OFF,
    DND_ORDER, RESET_ORDER
} from "../actions/order";

const orderInitState = {
    orderList: [],
    bun: null,
    orderNum: 0,
    orderPrice: 0,
    getOrderNumRequest: false,
    getOrderNumError: false,
    orderModalShow: false
}

export const order = (state = orderInitState, action) => {
    switch (action.type) {
        case GET_ORDER_NUM_REQUEST: {
            return {
                ...state,
                getOrderNumRequest: true,
                getOrderNumError: false,
            }
        }
        case GET_ORDER_NUM_SUCCESS: {
            return {
                ...state,
                getOrderNumRequest: false,
                getOrderNumError: false,
                orderNum: action.payload
            }
        }
        case GET_ORDER_NUM_ERROR: {
            return {
                ...state,
                getOrderNumRequest: false,
                getOrderNumError: true
            }
        }
        case ADD_ID_ORDER: {
            return {
                ...state,
                orderList: [...state.orderList, action.ingredient],
                orderPrice: state.orderPrice + action.price
            }
        }
        case ADD_BUN_ORDER: {
            return {
                ...state,
                bun: action.bun,
                orderPrice: state.orderPrice + action.price
            }
        }
        case REMOVE_ID_ORDER: {
            return {
                ...state,
                orderPrice: state.orderPrice - action.price,
                
                orderList: state.orderList.filter(ingredient => ingredient._id !== action.ingredient._id)
            }
        }
        case MODAL_ORDER_ON: {
            return {
                ...state,
                orderModalShow: true
            }
        }
        case MODAL_ORDER_OFF: {
            return {
                ...state,
                orderModalShow: false,
                orderNum: 0
            }
        }
        case DND_ORDER: {
            const { dragIndex, hoverIndex } = action.elements
            const ingredientsList = [...state.orderList]
            const dragElement = ingredientsList[dragIndex]
            const hoverElement = ingredientsList[hoverIndex]

            ingredientsList[hoverIndex] = dragElement
            ingredientsList[dragIndex] = hoverElement
            return {
                ...state,
                orderList: ingredientsList
            }
        }
        case RESET_ORDER: {
            return orderInitState
        }
        default: {
            return state
        }
    }
}