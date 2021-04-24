import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './BurgerConstructor.module.css';


function BurgerConstructor(props) {
    return (
        <div className={styles.Card}>
            <img src={props.image} alt=""/>
            <div className={styles.CardPrice}>
                <span className="text text_type_digits-default">
                    {props.price} <CurrencyIcon type="primary" />
                </span>
            </div>
            <div className="text text_type_main-default">
                {props.name}
            </div>
        </div>
    )
}

export default BurgerConstructor;