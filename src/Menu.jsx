import { useState } from 'react'
import { Link } from 'react-router-dom'


function Menu({page}) {

    /* Cambio de clase de la opcion de menu marcada segun objeto (page) que coincida con los nombres correspondientes */

    return (
        <>
            <nav className='menu'>
                <ul>

                    <li className={ page == "lista" ? "clicked" : "" } >
                        <Link to={"/"} className="menu-link">Lista</Link>
                    </li>
                    

                    <li className={ page == "gasto" ? "clicked" : "" } >
                        <Link to={"/gasto-total"} className="menu-link">Gasto total</Link>
                    </li>


                    <li className={ page == "productos" ? "clicked" : "" } >
                        <Link to={"/productos"} className="menu-link">Productos</Link>
                        </li>

                </ul>
            </nav>
            
        </>
    )
}

export default Menu