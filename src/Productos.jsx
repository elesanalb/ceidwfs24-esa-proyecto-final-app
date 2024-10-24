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
*               - Resumen producto nuevo --> ResumenNuevo.jsx
*           · Producto --> Producto.jsx
*               - Editar producto --> ProductoEditar.jsx
*           · Editar mercados --> MercadosEditar.jsx
*           · Editar prioridad --> PrioridadEditar.jsx
*           · Editar tipos --> TiposEditar.jsx
* _______________________________________________________ */



import { useState,useEffect } from 'react'
import { Link, useOutlet } from 'react-router-dom'

import Header from './Header.jsx'
import Menu from './Menu.jsx'
import ProductoNuevo from './ProductoNuevo.jsx'
import Producto from './Producto.jsx'
import MercadosEditar from './MercadosEditar.jsx'
import PrioridadEditar from './PrioridadEditar.jsx'
import TiposEditar from './TiposEditar.jsx'
import Filtros from './Filtros.jsx'
import './Productos.css'

import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";






function Productos(){

/* VARIABLES & HOOKS */

    /* Dibujar número de columnas del grid ------- */
        let [columnas,setColumnas] = useState([])


        
/* ---- Fetch a Productos, Mercados, Prioridad, Tipos -------------------------------------- */
    
    /* Productos ------------------------------------- */

        let [productos,setProductos] = useState([])
        
        useEffect( () => {
            fetch("http://localhost:4000/productos")
            .then( res => res.json())
            .then( productos => {
                setProductos(productos)
                setColumnas(Object.keys(productos[0]))
            })
        },[])


        let [productosInfo,setProductosInfo] = useState([])

        useEffect( () => {
            fetch("http://localhost:4000/productos/info")
            .then( res => res.json() )
            .then( productos => {
                setProductosInfo(productos)
            })
        },[])



    /* Mercados -------------------------------------- */

        let [mercados,setMercados] = useState([])
        
        useEffect( () => {
            fetch("http://localhost:4000/mercados")
            .then( res => res.json())
            .then( mercados => {
                setMercados(mercados)
            })
        },[])

    

    /* Prioridad ------------------------------------ */

    let [prioridadLista,setPrioridadLista] = useState([])
   
    useEffect( () => {
        fetch("http://localhost:4000/prioridad")
        .then( res => res.json())
        .then( prioridad => {
            setPrioridadLista(prioridad)
        })
    },[])



    /* Tipos ----------------------------------------- */

    let [tipos,setTipos] = useState([])
    useEffect( () => {
        fetch("http://localhost:4000/tipos")
        .then( res => res.json())
        .then( tipos => {
            setTipos(tipos)
        })
    },[])




/* --------------------------------------------------------------------------------------- */

/* PRODUCTO NUEVO */

    let productoNuevo = useOutlet()




/* --------------------------------------------------------------------------------------- */

/* PRODUTO | EDITAR | BORRAR */

    let [producto,setProducto] = useState()
    let [productoId,setProductoId] = useState()
    let [productoEstado,setProductoEstado] = useState()
    let [precio,setPrecio] = useState()
    let [precioKg,setPrecioKg] = useState()
    let [productoMercado,setProductoMercado] = useState()
    let [cantidad,setCantidad] = useState()
    let [cantidadUd,setCantidadUd] = useState()
    let [frecuencia,setFrecuencia] = useState()
    let [max,setMax] = useState()
    let [units,setUnits] = useState()
    let [productoPrioridad,setProductoPrioridad] = useState()
    let [productoTipo,setProductoTipo] = useState()
    


/* Estado ventana Producto | Editar */

    let [statusProducto,setStatusProducto] = useState(false)

    function verProducto(status){
        setStatusProducto(status)
    }




/* ------------------------------------------------------------------------------------------- */

/* EDITAR PROPIEDAD */

    let [statusMercados,setStatusMercados] = useState(false)

    function verMercados(status){
        setStatusMercados(status)
    }



    let [statusPrioridad,setStatusPrioridad] = useState(false)

    function verPrioridad(status){
        setStatusPrioridad(status)
    }



    let [statusTipos,setStatusTipos] = useState(false)
    
    function verTipos(status){
        setStatusTipos(status)
    }





/* --------------------------------------------------------------------------------------- */

/*  FUNCIONES */

/* PRODUCTOS ------------------------------------------------------------------------------ */
    function addProducto(producto){
        setProductos([...productos,producto])
        setProductosInfo([...productosInfo,producto])
    }

    
    function delProducto(id){
        setProductos(productos.filter( producto => { return producto.id != id }))
        setProductosInfo(productosInfo.filter( producto => {return producto.id != id }))
    }


    function editarProducto({id,producto}){
        setProductosInfo( productosInfo.map( productos => {
            if( productos.id == id ){
                productos.producto = producto
            }
            return productos
        }))
    }


    function editarProductoPrecio({id,precio}){
        setProductos( (productos.map( productos => {
            if( productos.id == id){
                productos.precio = precio
            }
            return productos
        })))
    }

    
    function editarProductoMercado({id,mercado}){
        setProductos( productos.map( productos => {
            if( productos.id == id ){
                productos.mercado = mercado
            }
            return productos
        }))
    }


    function editarProductoPrioridad({id,prioridad}){
        setProductos( productos.map( productos => {
            if( productos.id == id){
                productos.prioridad = prioridad
            }
            return productos
        }))
    }


    function editarProductoMax({id,max}){
        setProductos( productos.map( productos => {
            if( productos.id ==id ){
                productos.max = max
            }
            return productos
        }))
    }
    

    


/* MERCADOS --------------------------------------------------------------------------------- */

    function addMercado(mercado){
        setMercados([...mercados,mercado])
    }


    function delMercado(id){
        setMercados(mercados.filter( mercado => { return mercado.id != id }))
    }

    
    function editarMercado({id,mercado}){
        setMercados( mercados.map( mercados => {
            if( mercados.id == id ){
                mercados.mercado = mercado
            }
            return mercados
        }))
    }




/* PRIORIDAD ---------------------------------------------------------------------------------- */

    function addPrioridad(prioridad){
        setPrioridadLista([...prioridadLista,prioridad])
    
    }

    function delPrioridad(id){
        setPrioridadLista(prioridadLista.filter( prioridad => {  return prioridad.id != id }))
    }

    
    function editarPrioridad({id,prioridad}){
        setPrioridadLista( prioridadLista.map( prioridadLista => {
            if( prioridadLista.id == id ){
                prioridadLista.prioridad = prioridad
            }
            return prioridadLista
        }))
    }




/* TIPOS ---------------------------------------------------------------------------------------- */

    function addTipo(tipo){
        setTipos([...tipos,tipo])
    }


    function delTipo(id){
        setTipos(tipos.filter( tipo => { return tipo.id != id }))
    }

    function editarTipo({id,tipo}){
        setTipos( tipos.map( tipos => {
            if( tipos.id == id){
                tipos.tipo = tipo
            }
            return tipos
        }))
    }

    


/* ___________________________________________________________________________________________________________________________ */




    return (
        <>
            <Header title="Productos"/>
            <Menu page="productos"/>
            
            <nav className='seccion-productos'>
                


{/* ------------ PRODUCTO NUEVO ------------------------------------------------------ */}

                {
                    productoNuevo ? 
                    <ProductoNuevo 
                        mercados={mercados} prioridadLista={prioridadLista}
                        addProducto={addProducto}
                    /> 
                    : ""
                }

            {/* Icono link a Producto nuevo */}
                <Link className='icono-add' to="/productos/nuevo">
                    <FaPlus/>
                </Link>         





{/* ---------------------------------------------------------------------------------------------------------------------- */}

                {/* Componente Filtro */}
                    <Filtros />


{/* ----------- LISTA PRODUCTOS --------------------------------------------------------------------- */}

                <section className='contenedor-tabla'>

                    <section className='tabla-productos'
                        style={{
                            gridTemplateColumns : `repeat(${columnas.length}, max-content)`
                        }}
                    >


                        
            {/* ------- ESTADO ---------------------------------------------------------------------------------------- */}

                        <div className="productos-col estado">

                            <h3>
                                <TbProgressCheck className='icono-estado'/>
                            </h3>

                            {
                                productos.map( ({id,estado}) => {
                                    return (
                                        <div className='productos-row estado' key={id}>
                                            {
                                                estado ? "si" : "no"
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>


            {/* ------- PRODUCTOS ------------------------------------------------------------------------------------- */}

                        <div className="productos-col producto">

                            <h3>Productos</h3>

                            {
                                /* Utilizar los datos con los id (primary key) de Mercado, Prioridad y Tipo */
                                productosInfo.map( ({id,producto,estado,precio,preciokg,mercado,cantidad,cantidadud,max,units,prioridad,tipo,frecuencia}) => {
                                    return (
                                        <div className='productos-row producto'
                                            key={id} id={id}
                                            
                                            onClick={ event => {
                                                /* Abrir ventana de Producto --> Producto.jsx */
                                                setStatusProducto(true)
                                                
                                                /* Guardar los datos en variables para Productos */
                                                setProductoId(id)
                                                setProducto(producto)
                                                setProductoEstado(estado)
                                                setPrecio(precio)
                                                setPrecioKg(preciokg)
                                                setProductoMercado(mercado)
                                                setCantidad(cantidad)
                                                setCantidadUd(cantidadud)
                                                setMax(max)
                                                setUnits(units)
                                                setProductoPrioridad(prioridad)
                                                setProductoTipo(tipo)
                                                setFrecuencia(frecuencia)
                                            }}
                                        >
                                            <p className='productos-cont'>{producto}</p>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>




            {/* ------- PRECIO ------------------------------------------------------------------------------------- */}

                        <div className="productos-col precio">

                            <h3>Precio</h3>

                            {
                                productos.map( ({id,precio}) => {
                                    return ( <div className='productos-row precio' key={id} id={id}>{precio}€</div> )
                                })
                            }
                            
                        </div>




            {/* ------- PRECIO AL KILO ------------------------------------------------------------------------------- */}

                        <div class="productos-col precio">

                            <h3>€ / Kg</h3>

                            {
                                productos.map( ({id,preciokg}) => {
                                    return ( <div className="productos-row precio" key={id} id={id}>{preciokg}€/kg</div>)
                                })
                            }
                        </div>




            {/* ------- MERCADOS ------------------------------------------------------------------------------------- */}

                        <div className="productos-col mercado">

                            <h3>
                                Mercado
                                <MdEdit className='icono-editar'
                                    onClick={ event => {
                                        verMercados(true)
                                    }}
                                />
                            </h3>

                            {
                                productos.map( ({id,mercado}) => {
                                    return (
                                        <div className='productos-row mercado'>
                                            <div key={id} id={id} className={`tag ${mercado}`}>{mercado}</div>
                                        </div>
                                    )
                                })
                            }

                        </div>

           

            
            {/* -------- UNITS ------------------------------------------------------------------------------------- */}

                        <div className="productos-col units">

                            <h3>Units</h3>

                            {
                                productos.map( ({id,units}) => {
                                    return <div className='productos-row units' key={id} id={id}>{units}</div>
                                })
                            }

                        </div>




            {/* ------- MAX ------------------------------------------------------------------------------------- */}

                        <div className="productos-col max">

                            <h3>Max</h3>

                            {
                                productos.map( ({id,max}) => {
                                    return ( <div className='productos-row max' key={id} id={id}>{max}</div> )
                                })
                            }

                        </div>




            {/* ------- PRIORIDAD ------------------------------------------------------------------------------------- */}

                        <div className="productos-col prioridad">

                        <h3>
                            Prioridad
                            <MdEdit className='icono-editar'
                                onClick={ event => {
                                    verPrioridad(true)
                                }}
                            />
                        </h3>

                        {
                            productos.map( ({id,prioridad}) => {
                                return (
                                    <div className='productos-row prioridad'>
                                        <div key={id} id={id} className={`tag ${prioridad}`}>{prioridad}</div>
                                    </div>
                                )
                            })
                        }

                        </div>





            {/* ------- TIPOS --------------------------------------------------------------------------------------------- */}

                        <div className="productos-col tipos">

                            <h3>
                                Tipo
                                <MdEdit className='icono-editar'
                                    onClick={ event => {
                                        verTipos(true)
                                    }}
                                />
                            </h3>

                            {
                                productos.map( ({id,tipo}) => {
                                    return (
                                        <div className='productos-row tipo'>
                                            <div key={id} id={id} className={`tag ${tipo}`}>{tipo}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
            
 
                    </section>

                </section>





{/* -------------- PRODUCTO | EDITAR | BORRAR ------------------------------------------------------------------------------------------------------------------------------- */}

                {
                    statusProducto == true ? 

                    <Producto
                        verProducto={verProducto}

                        delProducto={delProducto}

                        editarProducto={editarProducto} 
                        editarProductoMercado={editarProductoMercado}
                        editarProductoPrecio={editarProductoPrecio}
                        editarProductoPrioridad={editarProductoPrioridad}
                        editarProductoMax={editarProductoMax}

                        
                        id={productoId} producto={producto} precio={precio}
                        mercados={mercados} productoMercado={productoMercado}
                        prioridadLista={prioridadLista} productoPrioridad={productoPrioridad}
                        tipos={tipos} productoTipo={productoTipo}
                        max={max} units={units}
                    />
                    : ""
                }



{/* -------------- MERCADOS | EDITAR | BORRAR ------------------------------------------------------------------------------------------------------------------------------- */}

                {
                    statusMercados ?

                    <MercadosEditar 
                        verMercados={verMercados}

                        mercados={mercados}

                        addMercado={addMercado} 
                        delMercado={delMercado}
                        editarMercado={editarMercado}
                        
                    />
                    : ""
                }

                {
                    statusPrioridad ?

                    <PrioridadEditar 
                        verPrioridad={verPrioridad}

                        prioridadLista={prioridadLista}

                        addPrioridad={addPrioridad}
                        delPrioridad={delPrioridad}
                        editarPrioridad={editarPrioridad}
                    />
                    : ""
                }

                {
                    statusTipos ?
                    <TiposEditar
                        verTipos={verTipos}

                        tipos={tipos}
                
                        addTipo={addTipo}
                        delTipo={delTipo}
                        editarTipo={editarTipo}
                    />
                    : ""
                }
                

            </nav>

        </>
    )
}

export default Productos