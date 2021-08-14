import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.css";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ADD_BUN_ORDER, ADD_ID_ORDER} from "../../services/actions/order";
import ConstructorElementWrapper from "./constructor-element-wrapper";


function BurgerConstructor() {

    const dispatch = useDispatch()
    // @ts-ignore
    const order = useSelector(state => state.order)
    // @ts-ignore
    const data = useSelector(state => state.allIngredients.allIngredientsList)
    const bun = order.bun

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

    function onDropHandler(item) {
        let product = data.filter(product => product._id === item._id)

        if (item.type === 'bun') {
            let isBun = order.bun
            let oldPrice = 0
            if (isBun) {
                let currentBun = data.filter(product => product._id === isBun._id)
                currentBun[0].counter = currentBun[0].counter - 1
                oldPrice += currentBun[0].price * 2


            }
            product[0].counter ? product[0].counter += 1 : product[0].counter = 1
            dispatch({
                type: ADD_BUN_ORDER,
                bun: product[0],
                price: product[0].price*2 - oldPrice
            })
        } else {
            product[0].counter ? product[0].counter += 1 : product[0].counter = 1
            dispatch({
                type: ADD_ID_ORDER,
                ingredient: item,
                price: item.type === 'bun' ? item.price*2 : item.price
            })
        }
    }

    return (
        <div className={isHover ? "order_card order_card_hover" : "order_card"} ref={dropTarget}>
            {
                bun || order.orderList.length > 0
                ?
                <div>
                    {
                        (bun)
                            ?
                            <div className="order-row mb-2">
                                <div className="drag-icon">
                                    <span className="pl-6"> </span>
                                </div>
                                <ConstructorElement
                                    thumbnail={bun.image}
                                    text={bun.name}
                                    price={bun.price}
                                    isLocked={true}
                                    type='top'
                                />
                            </div>
                            :
                            null
                    }
                    <div>
                        <ul className="order_list">
                            {order.orderList.map((product, index) => (
                                <li className="text text_type_main-default pb-6" key={index}>
                                    <ConstructorElementWrapper product={product} productIndex={index} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    {
                        (bun)
                            ?
                            <div className="order-row mt-2">
                                <div className="drag-icon">
                                    <span className="pl-6"> </span>
                                </div>
                                <ConstructorElement
                                    thumbnail={bun.image}
                                    text={bun.name}
                                    price={bun.price}
                                    isLocked={true}
                                    type='bottom'
                                />
                            </div>
                            :
                            null
                    }
                </div>
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