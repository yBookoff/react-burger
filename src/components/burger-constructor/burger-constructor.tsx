import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.css";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../../services/actions/burger-constructor-ingredients";
import {ADD_ID_ORDER, REMOVE_ID_ORDER} from "../../services/actions/order";
import ConstructorElementWrapper from "./constructor-element-wrapper";


function BurgerConstructor() {

    const dispatch = useDispatch()
    // @ts-ignore
    const order = useSelector(state => state.order.orderList)
    // @ts-ignore
    const data = useSelector(state => state.allIngredients.allIngredientsList)
    const bun = order.filter(product => product.type === 'bun')

    // const deleteIngredient
    const [{isHover}, dropTarget] = useDrop({
        accept: "card",
        drop(item) {
            onDropHandler(item)
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    })

    const [{isBurgerHover}, dropBurgerTarget] = useDrop({
        accept: "burger-list",
        drop(item) {
            console.log(item)
        },
        collect: monitor => ({
            isBurgerHover: monitor.isOver()
        })
    })

    function onDropHandler(item) {
        let product = data.filter(product => product._id === item._id)
        let isBun = order.filter(product => product.type === 'bun')
        if (item.type === 'bun' && isBun.length > 0) {
            let currentBun = data.filter(product => product._id === isBun[0]._id)
            dispatch({
                type: REMOVE_INGREDIENT,
                ingredient: currentBun[0]
            })
            currentBun[0].counter = currentBun[0].counter - 1
            dispatch({
                type: REMOVE_ID_ORDER,
                ingredient: currentBun[0],
                price: currentBun[0].price*2
            })
        }
        dispatch({
            type: ADD_INGREDIENT,
            ingredient: item
        })
        product[0].counter ? product[0].counter += 1 : product[0].counter = 1
        dispatch({
            type: ADD_ID_ORDER,
            ingredient: item,
            price: item.type === 'bun' ? item.price*2 : item.price
        })
    }

    return (
        <div className={isHover ? "order_card order_card_hover" : "order_card"} ref={dropTarget}>
            {
                order.length > 0
                    ?
                    <ul className="order_list">
                        {
                            bun.length > 0
                                ?
                                <li className="text text_type_main-default pb-6" key={-1}>
                                    <div className="order-row">
                                        <div className="drag-icon">
                                            <span className="pl-6"> </span>
                                        </div>
                                        <ConstructorElement
                                            thumbnail={bun[0].image}
                                            text={bun[0].name}
                                            price={bun[0].price}
                                            isLocked={true}
                                            type='top'
                                        />
                                    </div>
                                </li>
                                :
                                null
                        }
                        <div ref={dropBurgerTarget}>
                            {order.filter(product => product.type !== 'bun').map((product, index) => (
                                <li className="text text_type_main-default pb-6" key={index}>
                                    <ConstructorElementWrapper product={product} />
                                </li>
                            ))}
                        </div>
                        {
                            bun.length > 0
                                ?
                                <li className="text text_type_main-default pb-6" key={order.length+1}>
                                    <div className="order-row">
                                        <div className="drag-icon">
                                            <span className="pl-6"> </span>
                                        </div>
                                        <ConstructorElement
                                            thumbnail={bun[0].image}
                                            text={bun[0].name}
                                            price={bun[0].price}
                                            isLocked={true}
                                            type='bottom'
                                        />
                                    </div>
                                </li>
                                :
                                null
                        }
                    </ul>
                    :
                    <div className="info_panel">
                        <span className="text text_type_main-default">
                            Перетащите сюда первый ингредиент
                        </span>
                    </div>
            }

        </div>
    )
}

export default BurgerConstructor;