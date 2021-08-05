import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-constructor.css";
import styles from "../app/app.module.css";


function BurgerConstructor(props) {

    return (
        <div className={styles.order_card}>
            <ul className={styles.order_list}>
                {props.order.map((product, index) => (
                    <li className="text text_type_main-default pb-6" key={index}>
                        <div className="order-row">
                            <div className="drag-icon">
                                {
                                    (index < 1 || index > props.order.length - 2)
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
                                isLocked={index === 0 || index === props.order.length - 1}
                                type={index === 0 ? 'top' : (index === props.order.length - 1 ? 'bottom' : undefined)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BurgerConstructor;