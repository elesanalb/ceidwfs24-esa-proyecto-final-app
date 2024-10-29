import { useState } from "react"
import ProductoEditar from "./ProductoEditar.jsx";

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiSolidFridge } from "react-icons/bi";
import { TbShoppingBagEdit } from "react-icons/tb";





function Producto(
    {  
        verProducto,

        delProducto,

        editarProducto,editarProductoEstado,editarProductoPrecio,editarProductoPrecioKg,
        editarProductoCantidad,editarProductoUnits,editarProductoMax,
        editarProductoMercado,editarProductoPrioridad,editarProductoTipo,editarProductoFrecuencia,

        id,producto,estado,precio,precioKg,cantidad,units,max,frecuencia,
        productoInfoCantidad,productoInfoCantidadUd,
        mercados,productoMercado,
        prioridadLista,productoPrioridad,
        tipos,productoTipo,
        cantidadLista,cantidadUdLista        
    }
){
    
/* VARIABLES */
/* POPUP ANIMACION */

    let [statusPopup,setStatusPopup] = useState(true)




/* EDITAR */
/* Estado ventana ProductoEditar */

    let [statusEditar,setStatusEditar] = useState(false)

    function switchEditar(status){
        setStatusEditar(status)
    }





/* _______________________________________________________________________________________________________*/





    return (
        <>
            <nav className="nav-blur">


            {/* Tap fuera para salir de la ventana ------------ */}
            
                <div className="tap-fuera"
                    onClick={ event => {
                        setStatusPopup(false)
                        setTimeout( () => { verProducto(false) },250)
                    }}
                ></div>
                
            {/* ----------------------------------------------- */}





                <div className={`resumen pop-up ${ statusPopup ? "" : "pop-out" }`}>





{/* --------------- BOTONES ------------------------------------------------------------------------------------- */}
                        
                    <div className="seccion-botones top-botones">

                        <IoMdClose className="boton-icono cerrar"
                            onClick={ event => {
                                setStatusPopup(false)
                                setTimeout( () => { verProducto(false) },250)
                            }}
                        />




{/* ------------------- BORRAR ----------------------------------------------------------------------------- */}

                        <FaTrash className="boton-icono borrar"
                            onClick={ event => {
                                setStatusPopup(false)
                                setTimeout( () => { verProducto(false) },250)
                                

                                fetch("http://localhost:4000/productos/borrar",
                                    {
                                        method : "DELETE",
                                        body : JSON.stringify({ id : id }),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    delProducto(id)
                                })

                            }}
                        />

                    </div>
                    




{/* ------------------------------------------------------------------------------------------------------------ */}


                    <div className="info-producto">
                        <h2>{producto}</h2>
                    </div>


                    


{/* --------------- TAGS ------------------------------------------------------------------- */}
                    
                    <div className='info-producto tags'>

                        <div className={`tag ${ mercados.filter( (mercado) => mercado.id == productoMercado ).pop().mercado }`}>
                            {
                                mercados.filter( (mercado) => mercado.id == productoMercado ).pop().mercado
                            }
                        </div>

                        <div className={`tag ${ prioridadLista.filter( (prioridad) => prioridad.id == productoPrioridad ).pop().prioridad }`}>
                            {
                                prioridadLista.filter( (prioridad) => prioridad.id == productoPrioridad ).pop().prioridad
                            }
                        </div>

                        <div className={`tag ${ tipos.filter( (tipo) => tipo.id == productoTipo ).pop().tipo }`}>
                            {
                                tipos.filter( (tipo) => tipo.id == productoTipo ).pop().tipo
                            }
                        </div>

                        <div className={`tag ${ frecuencia == 1 ? "mensual" : "ocasional" }`}>
                            {
                                frecuencia == 1 ? "mensual" : "ocasional"
                            }
                        </div>

                    </div>





{/* -------------- PRECIO ---------------------------------------------------------------- */}

                    <div className="info-producto resumen-grid precio"
                        style={{ gridTemplateColumns : "repeat(3,auto)" }}
                    >
                        {/* columnas */}
                        <h5>Precio</h5>
                        <h5>Cant.</h5>
                        <h5>Precio/kg</h5>
                        
                        {/* filas */}
                        <p>{precio}€</p>
                        <p>{cantidad}</p>
                        <p>{precioKg}€</p>
                        
                    </div>



{ /* -------------- INFO ---------------------------------------------------------------- */}

                    <div className="info-producto">

                        <div>
                            <h5>Units</h5>
                            <p>{units}</p>
                        </div>


                        <div>
                            <h5>Max</h5>
                            <p>{max}</p>
                        </div>
                        


                        <div>

                            <h5>Estado</h5>


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

                                        fetch("http://localhost:4000/productos/editar/estado",
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
                                        .then( res => {
                                            /*editarProductoEstado(
                                                {
                                                    id : id,
                                                    estado : !estado
                                                }
                                            )*/
                                        })

                                    }}
                                />
                            </label>

                        </div>
                        
                        
                    </div>

                    


{/* --------------- Mensaje aviso ------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="info-producto">
                        <p className="mensaje-aviso">Se mostrarán valores por defecto en los campos que se dejaron vacíos.</p>        
                    </div>




{ /* -------------- BOTONES --------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="seccion-botones">

                        <button type="button" className="boton editar"
                        onClick={ event => {
                            setStatusEditar(true)
                        }}
                        >
                            <FaRegEdit />
                            Editar
                        </button>

                    </div>
                    

                </div>





{/* -------------- EDITAR ------------------------------------------------------------------------------------------ */}

                {
                    statusEditar ?
                    
                    <ProductoEditar
                        switchEditar={switchEditar}
                        verProducto={verProducto}

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
                        
                        
                        id={id} producto={producto} estado={estado} precio={precio} precioKg={precioKg}
                        max={max} units={units} frecuencia={frecuencia}
                        productoInfoCantidad={productoInfoCantidad} productoInfoCantidadUd={productoInfoCantidadUd}
                        mercados={mercados} productoMercado={productoMercado}
                        prioridadLista={prioridadLista} productoPrioridad={productoPrioridad}
                        tipos={tipos} productoTipo={productoTipo}
                        cantidadLista={cantidadLista} cantidadUdLista={cantidadUdLista}
                    /> 
                        
                    : ""
                }


            </nav>
        </>
    )

}



export default Producto