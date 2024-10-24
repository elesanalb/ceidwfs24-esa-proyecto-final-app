import { useState } from "react"
import { Link } from "react-router-dom"

import { FaRegEdit } from "react-icons/fa";





function ResumenNuevo(
    {
        verResumen,

        addProducto,

        item,precio,
        mercados,seleccionMercado,
        prioridadLista,seleccionPrioridad,
        max,units
    }
){

/* VARIABLES & HOOKS  */





/* _______________________________________________________________________________________________________*/





    return (
        <>
            <nav className="nav-blur">

                <div className="resumen pop-up">

                    <h4>Resumen del producto:</h4>
                    <div className="info-producto">
                        <h2>{item}</h2>
                    </div>
                    
                    

{/* --------------- TAGS ------------------------------------------------------------------- */}
                    
                    <div className='info-producto tags'>

                        <div className={`tag ${mercados.filter( (mercados) => mercados.id == seleccionMercado ).map( ({mercado}) => { return mercado } ) }`}>
                            {
                                /* Filtrar el id del mercado según el input (numerico) que le llega*/
                                mercados.filter( (mercados) => mercados.id == seleccionMercado ).map( ({mercado}) => { return mercado } )
                            }
                        </div>

                        <div className={`tag ${prioridadLista.filter( (prioridad) => prioridad.id == seleccionPrioridad ).map( ({prioridad}) => { return prioridad } )}`}>
                            {
                                /* Filtrar el id de la prioridad según el input (numerico) que le llega */
                                prioridadLista.filter( (prioridad) => prioridad.id == seleccionPrioridad ).map( ({prioridad}) => { return prioridad } )
                            }
                        </div>

                        <div className="tag basico">
                            Básico
                        </div>

                    </div>




{ /* -------------- INFO ---------------------------------------------------------------- */}


                    <div className="info-producto resumen-grid">
                        {/* columnas */}
                        <h5>Precio</h5>
                        <h5>Cant.</h5>
                        <h5>Precio/kg</h5>
                        <h5>Max</h5>
                        <h5>Units</h5>
                        
                        
                        {/* filas */}
                        <p className='precio'>{precio}€</p>
                        <p>20g</p>
                        <p className="precio">{precio}€</p>
                        <p>{max}</p>
                        <p>{units}</p>
                        
                        
                    </div>

                    
                    <div>
                        <p className="info-producto mensaje-aviso">Se pondrán valores por defecto en los campos que se han dejado vacíos.</p>        
                    </div>



{ /* -------------- BOTONES --------------------------------------------------------------------------- */}

                    <div className="seccion-botones">
                        
                    {/* EDITAR --> volver ------------------------------------------------------ */}

                        <button type="button" className="boton editar"
                            onClick={ event => {
                                verResumen(false)
                            }}
                        >
                            <FaRegEdit />
                            Editar
                        </button>



                    {/* SUBMIT --------------------------------------------------------------------- */}

                        <Link to={"/productos"}>
                        
                            <input className="boton submit" type="submit" value="Añadir"
                            
                                onClick={ event => {

/* -------------------------------- PETICION A LA API ----------------------------------------------- */

                                    fetch("http://localhost:4000/productos/nuevo",
                                        {
                                            method : "POST",
                                            body : JSON.stringify(
                                                {
                                                    producto : item,
                                                    mercado : seleccionMercado,
                                                    precio : precio,
                                                    prioridad : seleccionPrioridad,
                                                    max : max,
                                                    units : units
                                                }
                                            ),
                                            headers : (
                                                {
                                                    "Content-type" : "application/json"
                                                }
                                            )
                                        }
                                    )
                                    .then( res => res.json() )
                                    .then( ([{id}]) => {

                                        verResumen(false)

                                        /* Filtrar la listas de mercados/prioridad según el input (id) que llega para que devuelva el nombre correspondiente *\
                                         *      filter --> devuelve lista de un solo elemento
                                         *      pop() --> devuelve el elemento
                                         *      .mercado | .prioridad --> devuelve el valor correspondiente */

                                        addProducto(
                                            {
                                                id : id,
                                                producto : item,
                                                mercado : mercados.filter( (mercados) => mercados.id == seleccionMercado ).pop().mercado,
                                                precio : precio,
                                                prioridad : prioridadLista.filter( (prioridad) => prioridad.id == seleccionPrioridad ).pop().prioridad,
                                                max : max,
                                                units : units
                                            }
                                        )
                                        
                                    })
                                } }
                            />
                        </Link>
                        

                    </div>
                    
                </div>
            </nav>
        </>
    )

}



export default ResumenNuevo