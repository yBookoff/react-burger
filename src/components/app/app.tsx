import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import {useDispatch, useSelector} from "react-redux";
import {getAllIngredients} from "../../services/actions/all-ingredients";
import {SELECTED_INGREDIENT_OFF, SELECTED_INGREDIENT_ON} from "../../services/actions/selected-ingredient";
import {getOrder, MODAL_ORDER_OFF, MODAL_ORDER_ON, RESET_ORDER} from "../../services/actions/order";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


function App() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

    // @ts-ignore
    const data = useSelector(state => state.allIngredients.allIngredientsList)
    // @ts-ignore
    const order = useSelector(state => state.order)

    const openModalIngredients = (productId) => {
        let product = data.filter(product => product._id === productId.currentTarget.id)
        dispatch({
            type: SELECTED_INGREDIENT_ON,
            ingredient: product[0]
        })
        dispatch({
            type: MODAL_ORDER_OFF,
        })
    }

    const openModalOrder = () => {
        let orderIdsList = order.orderList.map(product => product._id)
        if (orderIdsList.length > 0 && Boolean(order.bun)) {
            dispatch(getOrder(orderIdsList))
            dispatch({
                type: MODAL_ORDER_ON
            })
        }
    }

    const closeModal = () => {
        if (visibleModalIngredient || visibleNodalOrder) {
            if (visibleNodalOrder) {
                dispatch({
                    type: MODAL_ORDER_OFF
                })
                dispatch({
                    type: RESET_ORDER
                })
                dispatch(getAllIngredients())
            } else {
                dispatch({
                    type: SELECTED_INGREDIENT_OFF
                })
            }
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === "Escape") {
            closeModal()
        }
    }

    React.useEffect(() => {
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keyup', handleKeyUp)
        }
    })

    // @ts-ignore
    const visibleModalIngredient = useSelector(state => state.selectedIngredient.selected)
    // @ts-ignore
    const visibleNodalOrder = useSelector(state => state.order.orderModalShow)
    // @ts-ignore
    const numberOrder = useSelector(state => state.order.orderNum)
    // @ts-ignore
    const selectedProduct = useSelector(state => state.selectedIngredient.ingredient)

    const [current, setCurrent] = React.useState('bun')
    // @ts-ignore
    const isLoading = useSelector(state => state.allIngredients.ingredientsLoadRequest)
    // @ts-ignore
    const hasError = useSelector(state => state.allIngredients.ingredientsLoadError)
    // @ts-ignore
    const price = useSelector(state => state.order.orderPrice)

    const tabsBlock = document.getElementById("tabs_block")

    const handleScrollIngredients = () => {

        const bunBlock = document.getElementById("buns_block")
        const sauceBlock = document.getElementById("sauce_block")
        const fillBlock = document.getElementById("fill_block")

        // @ts-ignore
        const tabsPos = tabsBlock.getBoundingClientRect().top
        // @ts-ignore
        const bunDist = Math.abs(tabsPos - bunBlock.getBoundingClientRect().top)
        // @ts-ignore
        const sauceDist = Math.abs(tabsPos - sauceBlock.getBoundingClientRect().top)
        // @ts-ignore
        const fillDist = Math.abs(tabsPos - fillBlock.getBoundingClientRect().top)

        if (bunDist < sauceDist && bunDist < fillDist) {
            setCurrent('bun')
        }

        if (sauceDist < bunDist && sauceDist < fillDist) {
            setCurrent('sauce')
        }

        if (fillDist < sauceDist && fillDist < bunDist) {
            setCurrent('fill')
        }
    }

    return (
        <div className={styles.App}>
            <AppHeader/>
            <div style={{overflow: 'hidden'}}>
                {(visibleModalIngredient || visibleNodalOrder) &&
                <Modal onClick={closeModal} title={visibleNodalOrder ? '' : 'Детали ингредиента'}>
                    {
                        visibleNodalOrder
                        ?
                            <OrderDetails orderNumber={numberOrder}/>
                        :
                            <IngredientDetail product={selectedProduct}/>
                    }
                </Modal>
                }
            </div>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.Main}>
                <section className={styles.Section}>
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                    <div style={{display: 'flex'}} id="tabs_block">
                        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                            Булки
                        </Tab>
                        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                            Соусы
                        </Tab>
                        <Tab value="fill" active={current === 'fill'} onClick={setCurrent}>
                            Начинки
                        </Tab>
                    </div>
                    {!(isLoading) && !(hasError)
                        ?
                        <div className={styles.ingredients_menu} onScroll={handleScrollIngredients}>
                            <h2 id="buns_block" className="text text_type_main-medium pt-4">Булки</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'bun').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text text_type_main-medium pt-4" id="sauce_block">Соусы</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'sauce').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text text_type_main-medium pt-4" id="fill_block">Начинки</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'main').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <p>Что-то пошло не так :-(</p>

                    }

                </section>
                <section className={styles.Section}>
                    <BurgerConstructor />
                    {
                        (order.orderList.length > 0 || order.bun)
                            &&
                            <div className={styles.total_price}>
                                        <span className="text text_type_digits-medium">{
                                            price
                                        }&nbsp;<CurrencyIcon type="primary"/>
                                        </span>
                                <Button onClick={openModalOrder}>Оформить заказ</Button>
                            </div>
                    }
                </section>
            </main>
            </DndProvider>
        </div>
    );
}

export default App;
