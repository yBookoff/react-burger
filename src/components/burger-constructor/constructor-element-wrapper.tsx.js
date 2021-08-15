import React, {useRef} from "react";
import PropTypes from "prop-types";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {DND_ORDER, REMOVE_ID_ORDER} from "../../services/actions/order";
import {useDrag, useDrop} from "react-dnd";


function ConstructorElementWrapper({product, productIndex}) {

    const dispatch = useDispatch()

    const data = useSelector(state => state.allIngredients.allIngredientsList)

    const deleteIngredient = () => {
        let ingredient = data.filter(ingredient => ingredient._id === product._id)
        ingredient[0].counter = ingredient[0].counter - 1
        dispatch({
            type: REMOVE_ID_ORDER,
            ingredient: ingredient[0],
            price: ingredient[0].type === 'bun' ? ingredient[0].price*2 : ingredient[0].price
        })
    }

    const [, dragElement] = useDrag({
        item: () => {
            return {product, productIndex}
        },
        type: "burger-list",
        collect: (monitor) => ({
            isDrag: monitor.isDragging()
        })
    })

    const refDD = useRef(null)

    const [, dropElement] = useDrop({
        accept: "burger-list",
        collect(monitor) {
            return {
                handlerElement: monitor.getHandlerId
            }
        },
        hover(item, monitor) {
            if (!refDD.current) {
                return
            }

            
            const dragIndex = item.index
            const hoverIndex = productIndex

            if (dragIndex === hoverIndex) {
                return;
            }

            
            const hoverBoundingReact = refDD.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingReact.bottom - hoverBoundingReact.top) / 2

            const clientOffset = monitor.getClientOffset()
            
            const hoverClientY = clientOffset.y - hoverBoundingReact.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            if (dragIndex !== undefined) {
                dispatch({
                    type: DND_ORDER,
                    elements: {dragIndex, hoverIndex}
                })
            }

            
            item.index = hoverIndex
        }
    })

    dragElement(dropElement(refDD))

    return (
        <div className="order-row" ref={refDD} key={productIndex}>
            <div className="drag-icon">
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                thumbnail={product.image}
                text={product.name}
                price={product.price}
                isLocked={false}
                type={undefined}
                handleClose={deleteIngredient}
            />
        </div>
    )
}

ConstructorElementWrapper.propTypes = {
    product: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }),
    productIndex: PropTypes.number.isRequired
}

export default ConstructorElementWrapper