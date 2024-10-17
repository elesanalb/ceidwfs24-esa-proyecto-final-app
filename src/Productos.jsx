/* ______________________________________________________ *\
*
* Productos.jsx
*
*   Hooks : 
*       - useState, useEffect
*       - Link, useOutlet
*
*   Datos : 
*       - API fetch a http://localhost:4000
*
*   Estructura :
*       - Cabecera --> Header.jsx
*       - Menu --> Menu.jsx
*       - Contenido :
*           · Filtros --> Filtros.jsx
*           · Lista de productos
*           · Producto nuevo --> ProductoNuevo.jsx
*           · Producto --> Producto.jsx
* _______________________________________________________ */



import { useState,useEffect } from 'react'
import { Link, useOutlet } from 'react-router-dom'

import Header from './Header.jsx'
import Menu from './Menu.jsx'
import ProductoNuevo from './ProductoNuevo.jsx'
import Producto from './Producto.jsx'
import Filtros from './Filtros.jsx'
import './Productos.css'

import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";





function Productos(){

/* VARIABLES & HOOKS  */

    

    let [columnas,setColumnas] = useState([])

    let [productos,setProductos] = useState([])
    
    useEffect( () => {
        fetch("http://localhost:4000/productos")
        .then( res => res.json())
        .then( productos => {
            setProductos(productos)
            setColumnas(Object.keys(productos[0]))
            //console.log(Object.keys(productos[0]))
        })
    }, [])



    let [mercados,setMercados] = useState([])
    
    useEffect( () => {
        fetch("http://localhost:4000/mercados")
        .then( res => res.json())
        .then( mercados => {
            setMercados(mercados)
        })
    },[])

    

    let [prioridad,setPrioridad] = useState([])
   
    useEffect( () => {
        fetch("http://localhost:4000/prioridad")
        .then( res => res.json())
        .then( prioridad => {
            setPrioridad(prioridad)
        })
    })



    /* Seleccion */

    let [selectId,setSelectId] = useState()
    let [selectProducto,setSelectProducto] = useState()
    let [selectMercado,setSelectMercado] = useState()
    let [selectPrioridad,setSelectPrioridad] = useState()
    let [selectPrecio,setSelectPrecio] = useState()
    let [selectMax,setSelectMax] = useState()
    let [selectUnits,setSelectUnits] = useState()



    /* Estados */

    let [statusPopup,setStatusPopup] = useState(false)
    let [verProducto,setVerProducto] = useState(false)


    let productoNuevo = useOutlet()



/*  FUNCIONES */

    function switchEditar(status){
        setVerProducto(status)
    }


    function addProducto(producto){
        setProductos([...productos,producto])
    }

    
    function delProducto(id){
        setProductos(productos.filter( producto => { return producto.id != id }))
    }


    function editarProducto(){
        console.log("editar")
    }

    


/* ___________________________________________________________________________________________________________________________ */

    return (
        <>
            <Header title="Productos"/>
            <Menu page="productos"/>
            
            <nav className='seccion-productos'
                style={ statusPopup ? { overflowY : "auto" } : { overflowY : "hidden" }}
            >
                


{/* ------------ PRODUCTO NUEVO ------------------------------------------------------ */}

                {
                    productoNuevo ? 
                    <ProductoNuevo 
                        mercados={mercados} prioridad={prioridad}
                        addProducto={addProducto}
                    /> 
                    : ""
                }


                
            {/* Componente Filtro */}
                <Filtros />


            {/* Icono link a Producto nuevo */}
                <Link className='add' to="/productos/nuevo"
                    onClick={ event => {
                        setStatusPopup(true)
                        console.log(statusPopup)
                    }}
                >
                    <FaPlus/>
                </Link>





{/* ----------- LISTA PRODUCTOS ------------------------------------------------------ */}

                <section className='lista-productos'>

                    <section className='productos'
                        style={{
                            gridTemplateColumns : `repeat(${columnas.length - 1}, max-content)`
                        }}
                    >



                        <div className="producto productos-col">
                            <h3>Productos</h3>
                            {
                                productos.map( ({id,producto,precio,mercado,prioridad,max,units}) => {
                                    return (
                                        <div className='productos-row'
                                            key={id} id={id}
                                            
                                            onClick={ event => {
                                                setVerProducto(true)
                                                
                                                setSelectId(id)
                                                setSelectProducto(producto)
                                                setSelectMercado(mercado)
                                                setSelectPrecio(precio)
                                                setSelectPrioridad(prioridad)
                                                setSelectMax(max)
                                                setSelectUnits(units)
                                            }}
                                        >
                                            <p className='productos-cont'>{producto}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        


                        <div className="productos-col mercado">
                            <h3>
                                Mercados
                                <MdEdit />
                            </h3>

                            {
                                productos.map( ({id,mercado}) => {
                                    
                                    return <div className='productos-row' key={id} id={id}>
                                                <div className={`tag ${mercado}`}>{mercado}</div>
                                            </div>
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
                            <h3>
                                Prioridad
                                <MdEdit />
                            </h3>

                            {
                                productos.map( ({id,prioridad}) => {
                                    return <div className='productos-row prioridad' key={id} id={id}>
                                                <div className={`tag ${prioridad}`}>{prioridad}</div>
                                            </div>
                                })
                            }
                        </div>


                        <div className="productos-col max">
                            <h3>Max</h3>

                            {
                                productos.map( ({id,max}) => {
                                    return <div className='productos-row max' key={id} id={id}>{max}</div>
                                })
                            }
                        </div>


                        <div className="productos-col units">
                            <h3>Units</h3>

                            {
                                productos.map( ({id,units}) => {
                                    return <div className='productos-row max' key={id} id={id}>{units}</div>
                                })
                            }
                        </div>

 

                    </section>

                </section>


                {
                    <Producto
                        editarProducto={editarProducto}
                        delProducto={delProducto}
                        switchEditar={switchEditar}
                        status={verProducto}
                        id={selectId}
                        item={selectProducto}
                        precio={selectPrecio}
                        mercados={mercados} seleccionMercado={selectMercado}
                        prioridad={prioridad} seleccionPrioridad={selectPrioridad}
                        max={selectMax}
                        units={selectUnits}
                    />   
                }
                

            </nav>

            
            
        </>
    )
}

export default Productos