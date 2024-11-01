/* ____________________________________________________________________________________________ *\
*
* Productos.jsx
*
*   Hooks : 
*       - useState, useEffect
*       - Link, useOutlet
*
*   Datos : 
*       - API fetch a https://ceidwfs24-esa-proyecto-final-back.onrender.com
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
* ________________________________________________________________________________________________ */



import { useState,useEffect } from 'react'

import Header from './Header.jsx'
import Menu from './Menu.jsx'
import ProductoNuevo from './ProductoNuevo.jsx'
import Producto from './Producto.jsx'
import MercadosEditar from './MercadosEditar.jsx'
import PrioridadEditar from './PrioridadEditar.jsx'
import TiposEditar from './TiposEditar.jsx'
import Filtros from './Filtros.jsx'
import './Productos.css'

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { BiSolidFridge } from "react-icons/bi";
import { TbShoppingBagEdit } from "react-icons/tb";






function Productos(){

/* VARIABLES & HOOKS */
       
/* ---- FETCH a Productos, Mercados, Prioridad, Tipos ------------------------------------------------------------------------------------------------------------------------ */
    
    /* PRODUCTOS ---------------------------------------------------------------------------------------------- */

        let [productos,setProductos] = useState([])
        
        useEffect( () => {
            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos",
                {
                    method : "POST",
                    body : JSON.stringify({ frecuencia : 1 }),
                    headers : {
                        "Content-type" : "application/json"
                    }
                }
            )
            .then( res => res.json())
            .then( productos => {
                setProductos(productos)
            })
        },[])




        let [productosInfo,setProductosInfo] = useState([])

        useEffect( () => {
            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos/info")
            .then( res => res.json() )
            .then( productos => {
                setProductosInfo(productos)
            })
        },[])




    /* Mercados ------------------------------------------------------------- */

        let [mercados,setMercados] = useState([])
        
        useEffect( () => {
            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/mercados")
            .then( res => res.json())
            .then( mercados => {
                setMercados(mercados)
            })
        },[])


    

    /* Prioridad ----------------------------------------------------------- */

        let [prioridadLista,setPrioridadLista] = useState([])
    
        useEffect( () => {
            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/prioridad")
            .then( res => res.json())
            .then( prioridad => {
                setPrioridadLista(prioridad)
            })
        },[])




    /* Tipos -------------------------------------------------------------- */

        let [tipos,setTipos] = useState([])
        useEffect( () => {
            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/tipos")
            .then( res => res.json())
            .then( tipos => {
                setTipos(tipos)
            })
        },[])





/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */

/* Switch tabs MENSUAL | OCASIONAL --------------------------------------------------------------------------------------------------------------------- */

    let [statusTab,setStatusTab] = useState(false)

    function productosPost(frecuencia){

        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos",
            {
                method : "POST",
                body : JSON.stringify({ frecuencia : frecuencia }),
                headers : {
                    "Content-type" : "application/json"
                }
            }
        )
        .then( res => res.json())
        .then( productos => {
            setProductos(productos)
        })
    }







/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */



/* Estado ventana Nuevo producto */

    let [productoNuevo,setProductoNuevo] = useState(false)
    
    function crearProducto(status){
        setProductoNuevo(status)
    }




/* Estado ventana Producto | Editar */

    let [statusProducto,setStatusProducto] = useState(false)

    function verProducto(status){
        setStatusProducto(status)
    }




/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */



/* PRODUTO | EDITAR | BORRAR */

    let [producto,setProducto] = useState()
    let [productoId,setProductoId] = useState()
    let [estado,setEstado] = useState()
    let [precio,setPrecio] = useState()
    let [precioKg,setPrecioKg] = useState()
    let [cantidad,setCantidad] = useState()
    let [max,setMax] = useState()
    let [units,setUnits] = useState()
    let [frecuencia,setFrecuencia] = useState()

    let [productoMercado,setProductoMercado] = useState()
    let [productoInfoCantidad,setProductoInfoCantidad] = useState()
    let [productoInfoCantidadUd,setProductoInfoCantidadUd] = useState()
    let [productoPrioridad,setProductoPrioridad] = useState()
    let [productoTipo,setProductoTipo] = useState()


    let [cantidadLista,setCantidadLista] = useState(
        [
            { value : "1" },
            { value : "2" },
            { value : "3" },
            { value : "5" },
            { value : "6" },
            { value : "100" },
            { value : "200" },
            { value : "500" },
            { value : "12" },
            { value : "24" }
        ]
    )

    let [cantidadUdLista,setCantidadUdLista] = useState(
        [
            { value : "kg" },
            { value : "g" },
            { value :  "L" },
            { value : "cL" },
            { value : "mL" },
            { value : "Ud" },
            { value : "m" }
        ]
    )
    



/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */



/* Esado ventana Editar propiedad */

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





/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/*  FUNCIONES */

/* PRODUCTOS ----------------------------------------------------------------------------------------------------------------------------------------- */

    function addProducto({id}){
       setProductos( productos.filter( productos => productos.id == id ).map( ({id}) => { return id }) )
    }

    
    function delProducto(id){
        setProductos(productos.filter( producto => { return producto.id != id }))
    }



    /* EDITAR PRODUCTO ---------------------------------------------------------------------------------------------------------*/

        function editarProducto({id,producto}){
            setProductos( productos.map( productos => {
                if( productos.id == id ){
                    productos.producto = producto
                }
                return productos
            }))
        }


        function editarProductoEstado({id,estado}){
            setProducto( productos.map( productos => {
                if( productos.id == id ){
                    productos.estado = estado
                }
                return productos
            }))
        }


        function editarProductoPrecio({id,precio}){
            setProductos( productos.map( productos => {
                if( productos.id == id){
                    productos.precio = precio
                }
                return productos
            }))
        }


        function editarProductoPrecioKg({id,preciokg}){
            setProductos( productos.map( productos => {
                if( productos.id == id ){
                    productos.preciokg = preciokg
                }
                return productos
            }))
        }


        function editarProductoCantidad({id,cantidad}){
            setProductos( productos.map( productos => {
                if( productos.id == id ){
                    productos.cantidad = cantidad
                }
                return productos
            }))
        }


        function editarProductoUnits({id,units}){
            setProductos( productos.map( productos => {
                if( productos.id == id){
                    productos.units = units
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


        function editarProductoTipo({id,tipo}){
            setProductos( productos.map( productos => {
                if( productos.id == id ){
                    productos.tipo = tipo
                }
                return productos
            }))
        }


        function editarProductoFrecuencia({id,frecuencia}){
            setProductos( productos.map( productos => {
                if( productos.id == id ){
                    productos.frecuencia = frecuencia
                }
                return productos
            }))
        }
        
    

    


/* MERCADOS ----------------------------------------------------------------------------------------------------------------------------------------------------- */

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




/* PRIORIDAD ---------------------------------------------------------------------------------------------------------------------------------------------------- */

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




/* TIPOS -------------------------------------------------------------------------------------------------------------------------------------------------------- */

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






/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* FILTROS */

    let [busquedaItem,setBusquedaItem] = useState()




    


/* ____________________________________________________________________________________________________________________--____________________________________________________________________________________ */





    return (
        <>
            <Header title="Productos"/>
            <Menu page="productos"/>
            
            <nav className='seccion-productos'>
                


{/* ------------ PRODUCTO NUEVO ------------------------------------------------------ */}

                {
                    productoNuevo ? 
                    <ProductoNuevo 
                        crearProducto={crearProducto}

                        addProducto={addProducto}

                        mercados={mercados} 
                        prioridadLista={prioridadLista}
                        tipos={tipos}
                        cantidadLista={cantidadLista}
                        cantidadUdLista={cantidadUdLista}
                    /> 
                    : ""
                }


                    <div className='barra-tareas'>

                        {/* Componente Filtro */}

                        <Filtros 
                            mercados={mercados} tipos={tipos} prioridadLista={prioridadLista}
                        />



                       {/* Icono añadir producto */}

                        <FaPlus className='icono-add'
                            onClick={ event => {
                                crearProducto(true)
                            }}
                        />



                    </div>

                




{/* ----------- LISTA PRODUCTOS --------------------------------------------------------------------------------------------------------------------------------- */}

                <section className='contenedor-tabla'>


{/* -------------------- HEADINGS -------------------------------------------------------------------------------------------------------------------------------- */}
                    <div className='tab-frecuencia'>

                        <div className={`tab-mensual ${ statusTab ? "tab-oculta" : "tab-actual" }`}
                            onClick={ event => {
                                productosPost(1)
                                setStatusTab(false)
                            }}
                        >
                            <h5>Mensual</h5>
                        </div>


                        <div className={`tab-ocasional ${ statusTab ? "tab-actual" : "tab-oculta" }`}
                            onClick={ event => {
                                productosPost(2)
                                setStatusTab(true)
                            }}
                        >
                            <h5>Ocasional</h5>
                        </div>

                    </div>


                    <section className="tabla-productos headings">


                    {/* ESTADO -------------------------------------------------- */}
                        <div className="productos-row heading estado">
                            <h3>
                                <TbProgressCheck className='icono-estado'/>
                            </h3>
                        </div>


                    {/* PRODUCTOS ----------------------------------------------- */}
                        <div className="productos-row heading producto">
                            <h3>Productos</h3>
                        </div>


                    {/* PRECIO -------------------------------------------------- */}
                        <div className='productos-row heading precio'>
                            <h3>€</h3>
                        </div>


                    {/* PRECIO / KG ---------------------------------------------- */}
                        <div className="productos-row heading preciokg">
                            <h3>€/kg</h3>
                        </div>
                    


                    {/* CANTIDAD ------------------------------------------------- */}
                        <div className='productos-row heading cantidad'>
                            <h3>Cant.</h3>
                        </div>



                    {/* UNITS ------------------------------------------------- */}
                        <div className='productos-row heading single-number'>
                            <h3>Units</h3>
                        </div>


                    {/* MAX ------------------------------------------------- */}
                        <div className='productos-row heading single-number'>
                            <h3>Max</h3>
                        </div>
                    
                    
                    {/* MERCADO ------------------------------------------------- */}
                        <div className="productos-row heading mercado tagging">
                            <h3>
                                Mercado
                                <MdEdit className='icono-editar'
                                    onClick={ event => {
                                        verMercados(true)
                                    }}
                                />
                            </h3>
                        </div>



                    {/* PRIORIDAD ------------------------------------------- */}
                        <div className='productos-row heading prioridad tagging'>
                            <h3>
                                Prioridad
                                <MdEdit className='icono-editar'
                                    onClick={ event => {
                                        verPrioridad(true)
                                    }}
                                />
                            </h3>
                        </div>


                    {/* TIPO ------------------------------------------------- */}
                        <div className="productos-row heading tipo tagging">
                            <h3>
                                Tipo
                                <MdEdit className='icono-editar'
                                    onClick={ event => {
                                        verTipos(true)
                                    }}
                                />
                            </h3>
                        </div>


                    </section>





{/* ------------------- TABLA PRODUCTOS ---------------------------------------------------------------------------------------------------------------------------------- */}

                    {
                        productos.map( ({id,producto,estado,precio,preciokg,mercado,cantidad,max,units,prioridad,tipo,frecuencia}) => {
                            return ( 
                                <>
                                    <section className='tabla-productos contenido-tabla'>




{/* --------------------------------------- ESTADO ------------------------------------------------------------------------------------------------------------------- */}

                                        <div className="productos-row estado">
                                            <label className="input-estado">

                                                <Toggle
                                                    defaultChecked={estado}
                                                    icons={
                                                        {
                                                            checked : <BiSolidFridge />,
                                                            unchecked : <TbShoppingBagEdit />
                                                        }
                                                    }

                                                    onChange={ event => {

                            /* ------------------------ PETICION A LA API ---------------------------------------------------------------------------------------*/

                                                        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos/editar/estado",
                                                            {
                                                                method : "PUT",
                                                                body : JSON.stringify(
                                                                    {
                                                                        id : id,
                                                                        estado : !estado
                                                                    }
                                                                ),
                                                                headers : {
                                                                    "Content-type" : "application/json"
                                                                }
                                                            }
                                                        )
                                                        .then( res => res.json())
                                                    }}
                                                />
                                            </label>
                                        </div>





{/* --------------------------------------- PRODUCTOS ------------------------------------------------------------------------------------------------------------------ */}
                                        
                                        <div className="productos-row producto" key={id}

                                            onClick={ event => {
                                                /* Abrir ventana de Producto --> Producto.jsx */
                                                setStatusProducto(true)

                                                /* Guardar los datos en variables para Productos */
                                                setProductoId(id)
                                                setProducto(producto)
                                                setEstado(estado)
                                                setPrecio(precio)
                                                setPrecioKg(preciokg)
                                                setCantidad(cantidad)
                                                setMax(max)
                                                setUnits(units)
                                                setFrecuencia(frecuencia)

                                                /* Utilizar los datos con los primary key (id) de Mercado,Prioridad y Tipo, ya que están unidos a Productos por un join */
                                                /* También extraer Cantidad y Cantidad Ud. que están combinados desde el back */
                                                productosInfo.filter( producto => producto.id == id ).map(({id,cantidad,cantidadud,mercado,prioridad,tipo}) => {
                                                    setProductoInfoCantidad(cantidad)
                                                    setProductoInfoCantidadUd(cantidadud)
                                                    setProductoMercado(mercado)
                                                    setProductoPrioridad(prioridad)
                                                    setProductoTipo(tipo)
                                                })
                                            
                                            }}
                                        >
            
                                            <p className='productos-cont'>{producto}</p>
                                        </div>
                                        




{/* --------------------------------------- PRECIO & PRECIO KG ---------------------------------------------------------------------------------------------------------- */}

                                        <div className='productos-row precio'>
                                            <p className='productos-cont'>{precio}€</p>
                                        </div>
                                        

                                        <div className="productos-row preciokg">
                                            <p className="productos-cont">
                                                {preciokg}
                                                {
                                                    preciokg ? "€/kg" : ""
                                                }
                                                
                                            </p>
                                        </div>





{/* --------------------------------------- CANTIDAD,UNITS,MAX -------------------------------------------------------------------------------------------------------------- */}
                                        
                                        <div className="productos-row cantidad">
                                            <p className='productos-cont'>{cantidad}</p>
                                        </div>


                                        <div className="productos-row single-number">
                                            <p className="productos-cont">{units}</p>
                                        </div>
                                        
                                        
                                        <div className="productos-row single-number">
                                            <p className="productos-cont">{max}</p>
                                        </div>                                





{/* --------------------------------------- MERCADO, PRIORIDAD, TIPO ----------------------------------------------------------------------------------------------------------------*/}
                                        
                                        <div className="productos-row mercado">
                                            <div className={`tag ${mercado}`}>{mercado}</div>
                                        </div>


                                        <div className="productos-row prioridad">
                                            <div className={`tag ${prioridad}`}>{prioridad}</div>
                                        </div>
                                        
                                        
                                        <div className="productos-row tipo">
                                            <div className={`tag ${tipo}`}>{tipo}</div>
                                        </div>
                                        

                                    </section>
                            
                                
                                </> 
                            )
                        })
                    }
                </section>







{/* -------------- PRODUCTO | EDITAR | BORRAR ------------------------------------------------------------------------------------------------------------------------------- */}

                {
                    statusProducto == true ? 

                    <Producto
                        verProducto={verProducto}

                        delProducto={delProducto}

                        editarProducto={editarProducto}
                        editarProductoEstado={editarProductoEstado}
                        editarProductoPrecio={editarProductoPrecio}
                        editarProductoPrecioKg={editarProductoPrecioKg}
                        editarProductoCantidad={editarProductoCantidad}
                        editarProductoUnits={editarProductoUnits}
                        editarProductoMax={editarProductoMax}
                        editarProductoMercado={editarProductoMercado}
                        editarProductoPrioridad={editarProductoPrioridad}
                        editarProductoTipo={editarProductoTipo}
                        editarProductoFrecuencia={editarProductoFrecuencia}

                        
                        id={productoId} producto={producto} estado={estado} precio={precio} precioKg={precioKg}
                        cantidad={cantidad} max={max} units={units} frecuencia={frecuencia}

                        productoInfoCantidad={productoInfoCantidad} productoInfoCantidadUd={productoInfoCantidadUd}
                        mercados={mercados} productoMercado={productoMercado}
                        prioridadLista={prioridadLista} productoPrioridad={productoPrioridad}
                        tipos={tipos} productoTipo={productoTipo}
                        cantidadLista={cantidadLista} cantidadUdLista={cantidadUdLista}
                        
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