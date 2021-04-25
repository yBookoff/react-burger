import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import product_list from '../../utils/product_list.js';
import order from "../../utils/order";

function App() {

    const [current, setCurrent] = React.useState('bun')

  return (
    <div className={styles.App}>
        <AppHeader />

        <main className={styles.Main}>
            <section className={styles.Section}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
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
                <h2 className="text text_type_main-medium pt-4 ">Булки</h2>
                <div className={styles.gridWrapper}>
                    {product_list.filter(product => product.type === 'bun').map((product) => (
                        <BurgerConstructor {...product}/>
                    ))}
                </div>

                <h2 className="text text_type_main-medium pt-4">Соусы</h2>
                <div className={styles.gridWrapper}>
                    {product_list.filter(product => product.type === 'sauce').map((product) => (
                        <BurgerConstructor {...product}/>
                    ))}
                </div>

                <h2 className="text text_type_main-medium pt-4">Начинки</h2>
                <div className={styles.gridWrapper}>
                    {product_list.filter(product => product.type === 'main').map((product) => (
                        <BurgerConstructor {...product}/>
                    ))}
                </div>
            </section>
            <section className={styles.Section}>
                <ul>
                    {order.map((product, index) => (

                        <li className={"text text_type_main-default pb-2"}>
                            <BurgerIngredients
                                {...product}
                                type={index === 0 ? 'top' : (index === order.length - 1 ? 'bottom' : null)}
                                isLocked={index === 0 || index === order.length - 1}
                            />
                        </li>
                    ))}
                </ul>
                <div className={styles.total_price}>
                    <span className="text text_type_digits-large">{
                        order.reduce((total, product) => (total + product.price), 0)
                    }  <CurrencyIcon type="primary" /></span>
                    <Button>Оформить заказ</Button>
                </div>
            </section>
        </main>
    </div>
  );
}

export default App;
