import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import "./burger-ingredients.css";


function BurgerIngredients(props) {
    return (
        <div className="order-row">
            <div className="drag-icon">
                {props.type
                    ?
                    <span className="pl-6"></span>
                    :
                    <DragIcon type="primary" />

                }
            </div>
            <ConstructorElement
                thumbnail={props.image}
                text={props.name}
                price={props.price}
                isLocked={props.isLocked}
                type={props.type}
            />
        </div>
    )
};

BurgerIngredients.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    isLocked: PropTypes.bool,
    type: PropTypes.string
}

export default BurgerIngredients;