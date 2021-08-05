import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientDetail from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import {BurgerContext} from "../../services/burgerContext";



interface IData {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    counter: number;
}

function App() {

    const url = 'https://norma.nomoreparties.space/api/ingredients'

    const [isLoading, setLoading] = React.useState(false)
    const [current, setCurrent] = React.useState('bun')
    const [hasError, setError] = React.useState(false)
    const [data, setData] = React.useState<IData[]>([])

    const [order, setOrder] = React.useState<IData[]>([])
    const [visible, setVisible] = React.useState(false)

    const [selectedProduct, setSelectedProduct] = React.useState<IData[]>([])
    const [modalOrder, setModalOrder] = React.useState(false)

    const openModalIngredients = (productId) => {
        let product = data.filter(product => product._id === productId.currentTarget.id)
        setSelectedProduct([product[0]])
        setModalOrder(false)
        setVisible(true)
    }

    const openModalOrder = () => {
        setModalOrder(true)
        setVisible(true)
    }

    const closeModal = () => {
        setVisible(false)
        setSelectedProduct([])
    }

    const getProducts = async () => {
        setLoading(true)
        setError(false)

        try {
            const response = await fetch(url)
            const dataResponse = await response.json()
            setData(dataResponse.data)
        } catch {
            setLoading(false)
            setError(true)
            console.log('Data loading failed')
        }
    }

    const addProduct = (productId) => {
        let product = data.filter(product => product._id === productId.currentTarget.id)
        setOrder([...order, product[0]])
        product[0].counter ? product[0].counter += 1 : product[0].counter = 1
    }

    React.useEffect(() => {
        getProducts();
    }, []);

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

    return (
        <div className={styles.App}>
            <AppHeader/>
            <div style={{overflow: 'hidden'}}>
                {visible &&
                <Modal onClick={closeModal} title={modalOrder ? '' : 'Детали ингредиента'}>
                    {
                        modalOrder
                        ?
                            <OrderDetails />
                        :
                            <IngredientDetail product={selectedProduct[0]}/>
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
                    {isLoading && !(hasError)
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
                                <BurgerContext.Provider value={order}>
                                    <BurgerConstructor />
                                    <div className={styles.total_price}>
                                                <span className="text text_type_digits-medium">{
                                                    order.reduce((total, product) => (total + product.price), 0)
                                                }&nbsp;<CurrencyIcon type="primary"/>
                                                </span>
                                        <Button onClick={openModalOrder}>Оформить заказ</Button>
                                    </div>
                                </BurgerContext.Provider>
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
