import { useState } from "react"
import ProductoEditar from "./ProductoEditar.jsx";

import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";





function Producto(
    {  
        verProducto,

        delProducto,
        editarProducto,editarProductoMercado,editarProductoPrecio,editarProductoPrioridad,editarProductoMax,

        id,producto,precio,
        mercados,productoMercado,
        prioridadLista,productoPrioridad,
        tipos,productoTipo,
        max,units
    }
){

/* VARIABLES & HOOKS  */

    let [maxCompra,setMaxCompra] = useState([false,false])





/* --------------------------------------------------------------------------------------------- */

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
                        verProducto(false)
                    }}
                ></div>
                
            {/* ----------------------------------------------- */}





                <div className="resumen pop-up">


{/* ------------------- BORRAR ----------------------------------------------------------------------------- */}
                        
                    <div className="seccion-botones top-botones">

                        <IoMdClose className="boton-icono cerrar"
                            onClick={ event => {
                                verProducto(false)
                            }}
                        />


                        <FaTrash className="boton-icono borrar"
                            onClick={ event => {
                                verProducto(false)

                                
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
                        <p className=''>{precio}€</p>
                        <p>20g</p>
                        <p className="">{precio}€</p>
                        
                    </div>



{ /* -------------- INFO ---------------------------------------------------------------- */}

                    <div className="info-producto resumen-grid"
                        style={{ gridTemplateColumns : "repeat(3,auto)" }}
                    >
                        {/* columnas */}
                        <h5>Units</h5>
                        <h5>Max</h5>
                        <h5>Compras</h5>
                        
                        {/* filas */}
                        <p>{units}</p>
                        <p>{max}</p>
                        <p>{max}</p>
                        
                        
                    </div>

                    
                    <div className="info-producto">
                        <p className="mensaje-aviso">Se mostrarán valores por defecto en los campos que se dejaron vacíos.</p>        
                    </div>





{ /* -------------- BOTONES --------------------------------------------------------------------------- */}

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
                        editarProductoMercado={editarProductoMercado}
                        editarProductoPrecio={editarProductoPrecio}
                        editarProductoPrioridad={editarProductoPrioridad}
                        editarProductoMax={editarProductoMax}
                        
                        
                        id={id} producto={producto} precio={precio}
                        mercados={mercados} productoMercado={productoMercado}
                        prioridadLista={prioridadLista} productoPrioridad={productoPrioridad}
                        tipos={tipos} productoTipo={productoTipo}
                        max={max} units={units}
                    /> 
                        
                    : ""
                }


            </nav>
        </>
    )

}



export default Producto