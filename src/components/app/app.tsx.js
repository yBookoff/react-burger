import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor.tsx";
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

    
    const data = useSelector(state => state.allIngredients.allIngredientsList)
    
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

    
    const visibleModalIngredient = useSelector(state => state.selectedIngredient.selected)
    
    const visibleNodalOrder = useSelector(state => state.order.orderModalShow)
    
    const numberOrder = useSelector(state => state.order.orderNum)
    
    const selectedProduct = useSelector(state => state.selectedIngredient.ingredient)

    const [current, setCurrent] = React.useState('bun')
    
    const isLoading = useSelector(state => state.allIngredients.ingredientsLoadRequest)
    
    const hasError = useSelector(state => state.allIngredients.ingredientsLoadError)
    
    const price = useSelector(state => state.order.orderPrice)

    const tabsBlock = document.getElementById("tabs_block")

    const handleScrollIngredients = () => {

        const bunBlock = document.getElementById("buns_block")
        const sauceBlock = document.getElementById("sauce_block")
        const fillBlock = document.getElementById("fill_block")

        
        const tabsPos = tabsBlock.getBoundingClientRect().top
        
        const bunDist = Math.abs(tabsPos - bunBlock.getBoundingClientRect().top)
        
        const sauceDist = Math.abs(tabsPos - sauceBlock.getBoundingClientRect().top)
        
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
                <Modal onClick={closeModal} title={visibleNodalOrder ? '' : '???????????? ??????????????????????'}>
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
                    <h1 className="text text_type_main-large">???????????????? ????????????</h1>
                    <div style={{display: 'flex'}} id="tabs_block">
                        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                            ??????????
                        </Tab>
                        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                            ??????????
                        </Tab>
                        <Tab value="fill" active={current === 'fill'} onClick={setCurrent}>
                            ??????????????
                        </Tab>
                    </div>
                    {!(isLoading) && !(hasError)
                        ?
                        <div className={styles.ingredients_menu} onScroll={handleScrollIngredients}>
                            <h2 id="buns_block" className="text text_type_main-medium pt-4">??????????</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'bun').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text text_type_main-medium pt-4" id="sauce_block">??????????</h2>
                            <div className={styles.gridWrapper}>
                                {data.filter(product => product.type === 'sauce').map((product) => (
                                    <div key={product._id} >
                                        <div onClick={openModalIngredients} id={product._id}>
                                            <BurgerIngredients {...product}/>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text text_type_main-medium pt-4" id="fill_block">??????????????</h2>
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
                        <p>??????-???? ?????????? ???? ?????? :-(</p>

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
                                <Button onClick={openModalOrder}>???????????????? ??????????</Button>
                            </div>
                    }
                </section>
            </main>
            </DndProvider>
        </div>
    );
}

export default App;
