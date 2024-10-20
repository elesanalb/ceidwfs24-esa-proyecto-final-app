/* ______________________________________________________ *\
*
* App.jsx
*
*   Hooks : 
*       -useState, useEffect
*
*   Datos : 
*       - API fetch a http://localhost:4000
*
*   Estructura :
*       - Cabecera --> Header.jsx
*       - Menu --> Menu.jsx
*       - Contenido :
*           · Filtros --> Filtros.jsx
*           · Lista de productos --> ListaCompra.jsx
* _______________________________________________________ */


import { useState,useEffect } from 'react'
import Header from './Header.jsx'
import Menu from './Menu.jsx'
import ListaCompra from './ListaCompra.jsx'
import Filtros from './Filtros.jsx'
import './App.css'

function App() {

    let [productos,setProductos] = useState([])

    useEffect( () => {
        fetch("http://localhost:4000/productos")
        .then( res => res.json())
        .then( productos => {
            setProductos(productos);
        })
    }, []);



    return (
        <>
            <Header title="Lista de la compra"/>
            <Menu page="lista"/>

            <nav className='lista-compra'>

                <section>
                    
                    <Filtros />

                    {
                        productos.map( ({id,producto,mercado,precio,prioridad}) => {
                            return <ListaCompra key={id} id={id} 
                                                producto={producto} mercado={mercado} precio={precio}
                                                maxCompra={[1,1]} prioridad={prioridad}
                                    />
                        })
                    }
                </section>
                
            </nav>
        </>
    )
}

export default App