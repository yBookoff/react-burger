export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST'
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR'
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS'


const getProducts = async () => {
    const urlIngredients = 'https://norma.nomoreparties.space/api/ingredients'
    try {
        const response = await fetch(urlIngredients)
        if (!response.ok) {
            throw new Error("Response isn't ok")
        }
        const dataResponse = await response.json()
        return dataResponse
    } catch {
        console.log('Data loading failed')
    }
}


export function getAllIngredients ()  {

    return function (dispatch) {
        dispatch({
            type: GET_ALL_INGREDIENTS_REQUEST
        })
        getProducts()
            .then((response) => {
                if (response && response.success) {
                    dispatch({
                        type: GET_ALL_INGREDIENTS_SUCCESS,
                        
                        payload: response.data
                    })
                } else {
                    dispatch({
                        type: GET_ALL_INGREDIENTS_ERROR
                    })
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_ALL_INGREDIENTS_ERROR
                })
                console.log('Ingredients Data loading failed')
            })
    }
}
