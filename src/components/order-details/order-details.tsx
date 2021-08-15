import React from "react";
import PropTypes from "prop-types";
import orderMarkImg from '../../images/orderMark.png';

import './order-details.css'


function OrderDetails({orderNumber}) {
    return (
        <div>
            <p className="text text_type_digits-large pb-10">{orderNumber === 0 ? '... .. .. .' : orderNumber}</p>
            <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
            <img src={orderMarkImg} alt=""/>
            <p className="text text_type_main-default pb-2 pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default pb-10 info">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}

export default OrderDetails;