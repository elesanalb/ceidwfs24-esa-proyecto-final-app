import { useState } from 'react'
import logo from './assets/cart-icon.svg'

function Header({title}) {

    return (
        <>
            <header>
                <img src={logo} alt="cart icon" className='logo'/>
                <h1 className='title'>{title}</h1>
            </header>
        </>
    )
}

export default Header