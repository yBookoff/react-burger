import React from "react";
import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './burger-ingredients.module.css';
import {useDrag} from "react-dnd";


function BurgerIngredients(props) {

    const ingredientData = props

    const [{ isDrag }, dragRef] = useDrag({
        item: ingredientData,
        type: "card",
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })

    return (
        <div className={styles.Card} ref={dragRef}>

            <img src={ingredientData.image} alt=""/>
            <div className={styles.CardPrice}>
                <span className="text text_type_digits-default">
                    {ingredientData.price} <CurrencyIcon type="primary" />
                </span>
            </div>
            <div className="text text_type_main-default">
                {ingredientData.name}
            </div>
            { ingredientData.counter > 0 ? <Counter count={ingredientData.counter} size="default" /> : <span> </span>}
        </div>
    )
}

BurgerIngredients.propTypes = {
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    counter: PropTypes.number,
}

export default BurgerIngredients;