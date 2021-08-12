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
import {ADD_ID_ORDER, getOrder, MODAL_ORDER_OFF, MODAL_ORDER_ON} from "../../services/actions/order";
import {ADD_INGREDIENT} from "../../services/actions/burger-constructor-ingredients";


function App() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

    // @ts-ignore
    const data = useSelector(state => state.allIngredients.allIngredientsList)
    // @ts-ignore
    const order = useSelector(state => state.order.orderList)

    const openModalIngredients = (productId) => {
        let product = data.filter(product => product._id === productId.currentTarget.id)
        // setSelectedProduct([product[0]])
        dispatch({
            type: SELECTED_INGREDIENT_ON,
            ingredient: product[0]
        })
        dispatch({
            type: MODAL_ORDER_OFF,
        })
    }

    const openModalOrder = () => {
        let orderIdsList = order.map(product => product._id)
        console.log(orderIdsList)
        // getOrder(orderIdsList)
        dispatch(getOrder(orderIdsList))
        // setModalOrder(true)
        dispatch({
            type: MODAL_ORDER_ON
        })
    }

    const closeModal = () => {
        // setVisible(false)
        dispatch({
            type: SELECTED_INGREDIENT_OFF
        })
        // setSelectedProduct([])
        dispatch({
            type: MODAL_ORDER_OFF
        })
    }

    const addProduct = (productId) => {
        let product = data.filter(product => product._id === productId.currentTarget.id)
        let isBun = order.filter(product => product.type === 'bun').length
        console.log(product)
        if (!(product[0].type === 'bun' && isBun > 0)) {
            // setOrder([...order, product[0]])
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: product[0]
            })
            product[0].counter ? product[0].counter += 1 : product[0].counter = 1
            // dispatch({
            //     type: product[0].type,
            //     price: product[0].price
            // })
            dispatch({
                type: ADD_ID_ORDER,
                ingredient: product[0],
                price: product[0].type === 'bun' ? product[0].price*2 : product[0].price
            })
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

            <main className={styles.Main}>
                <section className={styles.Section}>
                    <h1 className="text text_type_main-large">Соберите бургер</h1>
                    <div style={{display: 'flex'}}>
                        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                            Булки
                        </Tab>
                        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                            Соусы
                        </Tab>
                        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                            Начинки
                        </Tab>
                    </div>
                    {!(isLoading) && !(hasError)
                        ?
                        <>
                            <h2 className="text text_type_main-medium pt-4">Булки</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'bun').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                        <div onClick={addProduct} id={product._id} className={styles.posCenter}><Button
                                            type="secondary">Добавить</Button></div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text text_type_main-medium pt-4">Соусы</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'sauce').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                        <div onClick={addProduct} id={product._id} className={styles.posCenter}><Button
                                            type="secondary">Добавить</Button></div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text text_type_main-medium pt-4">Начинки</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'main').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                        <div onClick={addProduct} id={product._id} className={styles.posCenter}><Button
                                            type="secondary">Добавить</Button></div>
                                    </div>
                                ))}
                            </div>
                        </>
                        :
                        <p>Что-то пошло не так :-(</p>

                    }

                </section>
                <section className={styles.Section}>
                    {
                        order.length > 0
                            ?
                            <>
                                <BurgerConstructor />
                                <div className={styles.total_price}>
                                            <span className="text text_type_digits-medium">{
                                                price
                                            }&nbsp;<CurrencyIcon type="primary"/>
                                            </span>
                                    <Button onClick={openModalOrder}>Оформить заказ</Button>
                                </div>
                            </>
                            :
                            <div className={styles.total_price}>
                                <span className="text text_type_main-default pt-10">Выберите ингреденты для космо-бургера</span>
                            </div>
                    }
                </section>
            </main>
        </div>
    );
}

export default App;
