import { useState } from 'react'
import { Link,useLocation } from 'react-router-dom'

import { PiShoppingCart } from "react-icons/pi";
import { LuBookOpenCheck } from "react-icons/lu";
import { BiSolidFridge } from "react-icons/bi";




function Menu({page}) {

    const location = useLocation()




    /* Cambio de clase de la opcion de menu marcada segun objeto (page) que coincida con los nombres correspondientes */

    return (
        <>
            <nav className='menu'>
                <ul>

                    <li className={ page == "lista" ? "clicked" : "" }>
                        <Link to={"/"} className="menu-link">Lista</Link>

                        {
                            page == "lista" ?
                            <>
                                <div className="menu-circulo"></div>
                                <PiShoppingCart className='icono-menu menu-animacion-up' /> 
                            </>
                            
                            : ""
                        }
                        
                    </li>
                    

                    <li className={`gasto menu-link ${ page == "gasto" ? "clicked" : ""}`}>
                        <Link to={"/gasto-total"} className="menu-link">Gasto total</Link>

                        {
                            page == "gasto" ? 
                            <>
                                <div className={`menu-circulo`}></div>
                                <LuBookOpenCheck className={`icono-menu menu-animacion-up`} 
                                />
                            </>
                            
                            : ""
                        }

                        
                    </li>


                    <li className={ page == "productos" ? "clicked" : "" } >
                        <Link to={"/productos"} className="menu-link">Productos</Link>

                        {
                            page == "productos" ?
                            <>
                                <div className="menu-circulo"></div>
                                <BiSolidFridge className='icono-menu menu-animacion-up' /> 
                            </>
                             
                            : ""
                        }
                        
                    </li>

                </ul>
            </nav>
            
        </>
    )
}

export default Menu