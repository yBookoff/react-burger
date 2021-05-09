import React from "react";
import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-constructor.module.css';


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
            { props.counter > 0 ? <Counter count={props.counter} size="default" /> : <span></span>}
        </div>
    )
}

BurgerConstructor.propTypes = {
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    counter: PropTypes.number,
}

export default BurgerConstructor;