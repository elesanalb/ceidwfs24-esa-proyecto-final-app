import { useState } from "react"

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { BiSolidFridge } from "react-icons/bi";
import { TbShoppingBagEdit } from "react-icons/tb";




function ResumenNuevo(
    {
        crearProducto,
        verResumen,

        addProducto,

        producto,
        estado,setEstadoResumen,
        precio,preciokg,cantidad,cantidadud,max,units,frecuencia,
        mercados,seleccionMercado,
        prioridadLista,seleccionPrioridad,
        tipos,seleccionTipo
    }
){

/* VARIABLES & HOOKS  */

/* POPUP ANIMACION */

let [statusPopup,setStatusPopup] = useState(true)







/* ___________________________________________________________________________________________________________________________________________________________________________*/





    return (
        <>
            <nav className="nav-blur segundo-popup">

                <div className={`resumen producto-nuevo pop-up ${ statusPopup ? "" : "pop-out" }`}>



                    <form
                        onSubmit={ event => {

                            event.preventDefault()

/* --------------------- PETICION A LA API ----------------------------------------------------------------------------------------------------------------- */
                            
                            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos/nuevo",
                                {
                                    method : "POST",
                                    body : JSON.stringify(
                                        {
                                            producto : producto,
                                            estado : estado,
                                            precio : precio,
                                            preciokg : preciokg,
                                            mercado : seleccionMercado,
                                            cantidad : cantidad,
                                            cantidadud : cantidadud,
                                            max : max,
                                            units : units,
                                            prioridad : seleccionPrioridad,
                                            tipo : seleccionTipo,
                                            frecuencia : frecuencia
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
                                
                                addProducto(
                                    {
                                        id : id,
                                        /*
                                        producto : producto,
                                        estado : estado,
                                        precio : precio,
                                        preciokg : preciokg,
                                        mercado : seleccionMercado,
                                        cantidad : cantidad,
                                        cantidadud : cantidadud,
                                        max : max,
                                        units : units,
                                        prioridad : seleccionPrioridad,
                                        tipo : seleccionTipo,
                                        frecuencia : frecuencia
                                        */
                                    }
                                )
                                    
                            })

                            setStatusPopup(false)
                            setTimeout( () => { 
                                crearProducto(false)
                                verResumen(false)
                            },250)
                        } }
                    >

                    


                {/* Cerrar ventana ------------------------------------------------------ */}

                    <div className="seccion-botones top-botones">
                        <IoMdClose className="boton-icono cerrar"
                            onClick={ event => {
                                verResumen(false)
                            }}
                        />
                    </div>

                {/* --------------------------------------------------------------------- */}



                {/* Heading ------------------------------------------------------------ */}

                    <h4>Resumen del producto:</h4>
                    <div className="info-producto">
                        <h2>{producto}</h2>
                    </div>





{/* --------------- TAGS ----------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className='info-producto tags'>

                        <div className={`tag ${mercados.filter( (mercados) => mercados.id == seleccionMercado ).map( ({mercado}) => { return mercado } ) }`}>
                            {
                                /* Filtrar el id del mercado según el input (numerico) que le llega*/
                                mercados.filter( (mercados) => mercados.id == seleccionMercado ).map( ({mercado}) => { return mercado } )
                            }
                        </div>

                        <div className={`tag ${prioridadLista.filter( (prioridad) => prioridad.id == seleccionPrioridad ).map( ({prioridad}) => { return prioridad } ) }`}>
                            {
                                /* Filtrar el id de la prioridad según el input (numerico) que le llega */
                                prioridadLista.filter( (prioridad) => prioridad.id == seleccionPrioridad ).map( ({prioridad}) => { return prioridad } )
                            }
                        </div>

                        <div className={`tag ${ tipos.filter( (tipos) => tipos.id == seleccionTipo ).map( ({tipo}) => { return tipo } ) }`}>
                            {
                                tipos.filter( (tipos) => tipos.id == seleccionTipo ).map( ({tipo}) => { return tipo } )
                            }
                        </div>

                        <div className={`tag ${ frecuencia == 1 ? "mensual" : "ocasional" }`}>
                            {
                                frecuencia == 1 ? "mensual" : "ocasional"
                            }
                        </div>

                    </div>





{ /* -------------- PRECIO ---------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                    <div className="info-producto resumen-grid precio">
                        
                        {/* columnas */}
                        <h5>Precio</h5>
                        <h5>Cant.</h5>
                        <h5>Precio/kg</h5>


                        {/* filas */}
                        <p>{precio}€</p>
                        <p>
                            { cantidad ? cantidad : "-" }
                            { cantidadud ? cantidadud : "-" }
                        </p>
                        <p>{ preciokg ? `${preciokg}€/kg` : "--" }</p>

                    </div>





{/* --------------- INFO --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className="info-producto single-number">

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
                                        setEstadoResumen(!estado)
                                    }}
                                />
                            </label>                            

                        </div>

                    </div>





{/* --------------- Mensaje aviso ------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div>
                        <p className="info-producto mensaje-aviso">Se pondrán valores por defecto en los campos que se han dejado vacíos.</p>
                    </div>




{ /* -------------- BOTONES --------------------------------------------------------------------------- */}

                    <div className="seccion-botones">

                    {/* EDITAR --> volver ------------------------------------------------------ */}

                        <button type="button" className="boton editar"
                            onClick={ event => {
                                setStatusPopup(false)
                                setTimeout( () => { 
                                    verResumen(false)
                                },250)
                                
                            }}
                        >
                            <FaRegEdit />
                            Editar
                        </button>



                    {/* SUBMIT --------------------------------------------------------------------- */}

                        <input className="boton submit" type="submit" value="Añadir"/>

                        
                    </div>
                    </form>
                </div>
            </nav>
        </>
    )

}



export default ResumenNuevo