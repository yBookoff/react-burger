import React from 'react';
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/index.js";
import styles from './app-header.module.css'

function AppHeader() {

    return (
        <header className="pt-2 pb-2">
            <nav className="text text_type_main-default">
                <ul className={styles.left}>
                    <li><BurgerIcon type="primary" /> <span className={styles.active}>Конструктор</span></li>
                    <li><ListIcon type="secondary" /> <span>Лента заказов</span></li>
                </ul>
                <span className="pt-1">
                    <Logo />
                </span>

                <ul className={styles.right}>
                    <li><ProfileIcon type="secondary"/> <span>Личный кабинет</span></li>
                </ul>
            </nav>

        </header>
    )
}

export default AppHeader;