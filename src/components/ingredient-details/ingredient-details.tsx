import React from "react";
import styles from "./ingredient-details.module.css";


function IngredientDetails(product)  {
    return (
        <>
            <img src={product.image} alt="" />
            <h3 className="text text_type_main-medium pb-5">{product.name}</h3>
            <p className="text text_type_main-default pb-5">Описание ингредиента будет добавлено позже.</p>
            <div className={styles.grid4}>
                <div className="text text_type_main-default">
                    <p>Калории, ккал</p>
                    <p className="text text_type_digits-default">{product.calories}</p>
                </div>
                <div className="text text_type_main-default">
                    <p>Белки, г</p>
                    <p className="text text_type_digits-default">{product.proteins}</p>
                </div>
                <div className="text text_type_main-default">
                    <p>Жиры, г</p>
                    <p className="text text_type_digits-default">{product.fat}</p>
                </div>
                <div className="text text_type_main-default">
                    <p>Углеводы, г</p>
                    <p className="text text_type_digits-default">{product.carbohydrates}</p>
                </div>
            </div>
        </>
    )
}



export default IngredientDetails;