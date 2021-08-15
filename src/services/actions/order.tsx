export const MODAL_ORDER_ON = 'MODAL_ORDER_ON';
export const MODAL_ORDER_OFF = 'MODAL_ORDER_OFFs';
export const GET_ORDER_NUM_REQUEST = 'GET_ORDER_NUM_REQUEST';
export const GET_ORDER_NUM_ERROR = 'GET_ORDER_NUM_ERROR';
export const GET_ORDER_NUM_SUCCESS = 'GET_ORDER_NUM_SUCCESS';
export const ADD_ID_ORDER = 'ADD_ID_ORDER';
export const ADD_BUN_ORDER = 'ADD_BUN_ORDER';
export const REMOVE_ID_ORDER = 'REMOVE_ID_ORDER';
export const DND_ORDER = 'DND_ORDER';
export const RESET_ORDER = 'RESET_ORDER';



const getOrderNumber = async (orderIds) => {
    const urlOrder = 'https://norma.nomoreparties.space/api/orders'
    try {
        const response = await fetch(urlOrder, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                'ingredients': orderIds
            })
        })
        if (!response.ok) {
            throw new Error("Response isn't ok")
        }
        const dataResponse = await response.json()
        return dataResponse
    } catch {
        console.log('Order loading failed!')
    }
}

export function getOrder (orderIds) {

    return function (dispatch) {
        dispatch({
            type: GET_ORDER_NUM_REQUEST
        })
        getOrderNumber(orderIds)
            .then((response) => {
                // @ts-ignore
                if (response.success) {
                    dispatch({
                        type: GET_ORDER_NUM_SUCCESS,
                        // @ts-ignore
                        payload: response.order.number
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_NUM_ERROR
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_NUM_ERROR
                })
                console.log('Order Number loading failed')
            })
    }
}

