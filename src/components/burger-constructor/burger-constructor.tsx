import React, {useContext} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.css";
import {BurgerContext} from "../../services/burgerContext";


function BurgerConstructor() {

    const order = useContext(BurgerContext)
    const bun = order.filter(product => product.type === 'bun')

    return (
        <div className="order_card">
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
        </div>
    )
}

export default BurgerConstructor;