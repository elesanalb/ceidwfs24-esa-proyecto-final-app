import { useState,useEffect } from 'react'
import { Link, useOutlet } from 'react-router-dom'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import Producto from './Producto.jsx'
import Filtros from './Filtros.jsx'
import './Productos.css'
import { FaPlus } from "react-icons/fa6";


function Productos() {

    let [productos,setProductos] = useState([])
    let [colProductos,setColProductos] = useState([]);

    useEffect( () => {
        fetch("http://localhost:4000/productos")
        .then( res => res.json())
        .then( productos => {
            setProductos(productos);
            setColProductos(Object.keys(productos[0]).map( (x,i) => { return x}))
        })
    }, []);


    let productoNuevo = useOutlet();


    return (
        <>
            <Header title="Productos"/>
            <Menu page="productos"/>
            
            <nav className='seccion-productos'>

                {
                    productoNuevo ? <Producto/> : ""
                }

                
                <Filtros />


                <Link className='add' to="/productos/nuevo"
                    onClick={ event => {
                        console.log(productoNuevo);
                        console.log(colProductos)
                    }}
                >
                    <FaPlus/>
                </Link>



                <section className='lista-productos'>
                    <section className='productos'>
                        

                        <div className="productos-col producto">
                            <h3>Productos</h3>
                            {
                                productos.map( ({id,producto}) => {
                                    return <div className='productos-row producto' key={id} id={id}>{producto}</div>
                                })
                            }
                        </div>
                        
                        <div className="productos-col mercado">
                            <h3>Mercados</h3>

                            {
                                productos.map( ({id,mercado}) => {
                                    return <div className='productos-row mercado' key={id} id={id}>{mercado}</div>
                                })
                            }
                        </div>

                        <div className="productos-col precio">
                            <h3>Precio</h3>

                            {
                                productos.map( ({id,precio}) => {
                                    return <div className='precio productos-row' key={id} id={id}>{precio}€</div>
                                })
                            }
                        </div>

                        <div className="productos-col prioridad">
                            <h3>Prioridad</h3>

                            {
                                productos.map( ({id,prioridad}) => {
                                    return <div className='productos-row prioridad' key={id} id={id}>{prioridad}</div>
                                })
                            }
                        </div>

                    </section>

                </section>

            </nav>

            
            
        </>
    )
}

export default Productos