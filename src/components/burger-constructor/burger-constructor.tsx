import React, {useContext} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.css";
import {BurgerContext} from "../../services/burgerContext";


function BurgerConstructor() {

    const order = useContext(BurgerContext)
    console.log('order:', order)

    return (
        <div className="order_card">
            <ul className="order_list">
                {order.map((product, index) => (
                    <li className="text text_type_main-default pb-6" key={index}>
                        <div className="order-row">
                            <div className="drag-icon">
                                {
                                    (index < 1 || index > order.length - 2)
                                    ?
                                    <span className="pl-6"> </span>
                                    :
                                    <DragIcon type="primary" />

                                }
                            </div>
                            <ConstructorElement
                                thumbnail={product.image}
                                text={product.name}
                                price={product.price}
                                isLocked={index === 0 || index === order.length - 1}
                                type={index === 0 ? 'top' : (index === order.length - 1 ? 'bottom' : undefined)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BurgerConstructor;