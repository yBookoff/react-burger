import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.css";
import {useDispatch, useSelector} from "react-redux";
import { useDrop } from "react-dnd";
import {ADD_INGREDIENT} from "../../services/actions/burger-constructor-ingredients";
import {ADD_ID_ORDER} from "../../services/actions/order";


function BurgerConstructor() {

    const dispatch = useDispatch()
    // @ts-ignore
    const order = useSelector(state => state.order.orderList)
    const bun = order.filter(product => product.type === 'bun')

    // const deleteIngredient
    const [, dropTarget] = useDrop({
        accept: "card",
        drop(item) {
            onDropHandler(item)
        }
    })

    function onDropHandler(item) {
        // наверное стоит вынести логику добавления булки, не булки в редьюсер
        console.log(item)
        let isBun = order.filter(product => product.type === 'bun').length
        console.log(item)
        if (!(item.type === 'bun' && isBun > 0)) {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: item
            })
            // item.counter ? item.counter += 1 : item.counter = 1
            dispatch({
                type: ADD_ID_ORDER,
                ingredient: item,
                price: item.type === 'bun' ? item.price*2 : item.price
            })
        }
    }

    return (
        <div className="order_card" ref={dropTarget}>
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
                        {order.filter(product => product.type !== 'bun').map((product, index) => (
                            <li className="text text_type_main-default pb-6" key={index}>
                                <div className="order-row">
                                    <div className="drag-icon">
                                        <DragIcon type="primary" />
                                    </div>
                                    <ConstructorElement
                                        thumbnail={product.image}
                                        text={product.name}
                                        price={product.price}
                                        isLocked={false}
                                        type={undefined}
                                        // handleClose={deleteIngredient}
                                    />
                                </div>
                            </li>
                        ))}
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