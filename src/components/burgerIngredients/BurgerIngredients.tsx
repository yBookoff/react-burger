import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";


function BurgerIngredients(props) {
    return (
        <div>
            {props.type ? <span className="pl-3"></span> : <DragIcon type="primary" />}
            <ConstructorElement
                thumbnail={props.image}
                text={props.name}
                price={props.price}
                isLocked={props.isLocked}
                type={props.type}
            />
        </div>
    )
}

export default BurgerIngredients;