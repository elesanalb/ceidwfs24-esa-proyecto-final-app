/* ______________________________________________________ *\
*
* App.jsx
*
*   Hooks : 
*       -useState, useEffect
*
*   Datos : 
*       - API fetch a https://ceidwfs24-esa-proyecto-final-back.onrender.com
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

/* VARIABLES & HOOKS  */

    let [productosCompra,setProductosCompra] = useState([])

    useEffect( () => {
        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos/compra",
            {
                method : "POST",
                body : JSON.stringify({ filtromercado : "" }),
                headers : {
                    "Content-type" : "application/json"
                }
            }
        )
        .then( res => res.json())
        .then( productos => {
            setProductosCompra(productos);
        })
    }, []);



/* Mercados -------------------------------------- */

    let [mercados,setMercados] = useState([])
        
    useEffect( () => {
        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/mercados")
        .then( res => res.json())
        .then( mercados => {
            setMercados(mercados)
        })
    },[])



/* Prioridad ------------------------------------ */

    let [prioridadLista,setPrioridadLista] = useState([])

    useEffect( () => {
        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/prioridad")
        .then( res => res.json())
        .then( prioridad => {
            setPrioridadLista(prioridad)
        })
    },[])



/* Tipos ----------------------------------------- */

    let [tipos,setTipos] = useState([])

    useEffect( () => {
        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/tipos")
        .then( res => res.json())
        .then( tipos => {
            setTipos(tipos)
        })
    },[])






/* ------------------------------------------------------------------------------------------------------------------------- */

/* FILTROS */

    let [filtroMercado,setFiltroMercado] = useState()

    function filtrarMercado(mercado){
        setFiltroMercado(mercado)
    }





/* --------------------------------------------------------------------------------------------------------------------------- */

/* FUNCIONES */

    function editarProductosCompra({id}){
        setProductosCompra( productosCompra.filter( productos => productos.id != id ).map( productos => { return productos }))
    }


    





/* ___________________________________________________________________________________________________________________________ */

    return (
        <>
            <Header title="Lista de la compra"/>
            <Menu page="lista"/>



            <nav className='lista-compra'>

                <section>
                    
                    <Filtros 
                        filtrarMercado={filtrarMercado}
                        mercados={mercados} tipos={tipos} prioridadLista={prioridadLista}
                    />




                    {
                        productosCompra.map( ({id,producto,estado,mercado,precio,prioridad,max}) => {
                            return <ListaCompra key={id} id={id} 
                                                editarProductosCompra={editarProductosCompra}
                                                producto={producto} estado={estado} mercado={mercado} precio={precio} prioridad={prioridad} max={max}
                                    />
                        })
                    }
                </section>
                
            </nav>
        </>
    )
}

export default App