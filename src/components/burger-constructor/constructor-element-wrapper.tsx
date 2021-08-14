import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {REMOVE_INGREDIENT} from "../../services/actions/burger-constructor-ingredients";
import {REMOVE_ID_ORDER} from "../../services/actions/order";
import {useDrag} from "react-dnd";


function ConstructorElementWrapper({product}) {

    const dispatch = useDispatch()

    // @ts-ignore
    const data = useSelector(state => state.allIngredients.allIngredientsList)

    const deleteIngredient = () => {
        let ingredient = data.filter(ingredient => ingredient._id === product._id)
        dispatch({
            type: REMOVE_INGREDIENT,
            ingredient: ingredient[0]
        })
        ingredient[0].counter = ingredient[0].counter - 1
        dispatch({
            type: REMOVE_ID_ORDER,
            ingredient: ingredient[0],
            price: ingredient[0].type === 'bun' ? ingredient[0].price*2 : ingredient[0].price
        })
    }

    const [{ isDrag }, dragBurgerRef] = useDrag({
        item: product,
        type: "burger-list",
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <div className="order-row" ref={dragBurgerRef}>
            <div className="drag-icon">
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                thumbnail={product.image}
                text={product.name}
                price={product.price}
                isLocked={false}
                type={undefined}
                handleClose={deleteIngredient}
            />
        </div>
    )
}

export default ConstructorElementWrapper