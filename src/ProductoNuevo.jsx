import { useState } from "react"

import ResumenNuevo from "./ResumenNuevo.jsx"

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideLine } from "react-icons/ri";
import { BiSolidFridge } from "react-icons/bi";
import { TbShoppingBagEdit } from "react-icons/tb";


function ProductoNuevo(
    {
        crearProducto,

        addProducto,
        
        mercados,prioridadLista,tipos,cantidadLista,cantidadUdLista
    }
){

/* VARIABLES & HOOKS  */

    let [inputItem,setInputItem] = useState("")
    let [statusItem,setStatusItem] = useState(false)

    let [inputEstado,setInputEstado] = useState()

    let [inputPrecio,setInputPrecio] = useState()
    let [inputPrecioKg,setInputPrecioKg] = useState()
    let [statusPrecio,setStatusPrecio] = useState(0)
    let [statusPrecioKg,setStatusPrecioKg] = useState(false)

    let [inputCantidad,setInputCantidad] = useState()
    let [inputCantidadUd,setInputCantidadUd] = useState()
    let [statusCantidad,setStatusCantidad] = useState(false)
    let [statusCantidadUd,setStatusCantidadUd] = useState(0)

    let [inputMax,setInputMax] = useState()
    let [inputUnits,setInputUnits] = useState()
    let [statusMax,setStatusMax] = useState(0)
    let [statusUnits,setStatusUnits] = useState(0)

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [statusMercado,setStatusMercado] = useState(false)

    let [seleccionPrioridad,setSeleccionPrioridad] = useState()
    let [seleccionTipo,setSeleccionTipo] = useState()
    let [seleccionFrecuencia,setSeleccionFrecuencia] = useState()

    let [statusOpciones,setStatusOpciones] = useState(false)


    /* Valores por defecto */

    if( inputEstado == undefined ){
        setInputEstado(false)
    }

    if( inputCantidad == "" || inputCantidad == undefined ){
        setInputCantidad(1)
    }
    if( inputCantidadUd == "" || inputCantidadUd == undefined ){
        setInputCantidadUd("kg")
    }
    if( inputMax == "" || inputMax == undefined ){
        setInputMax(1)
    }
    if( inputUnits == "" || inputUnits == undefined ){
        setInputUnits(1)
    }
    if( !seleccionPrioridad ){
        setSeleccionPrioridad(1)
    }
    if( !seleccionTipo ){
        setSeleccionTipo(1)
    }
    if( !seleccionFrecuencia ){
        setSeleccionFrecuencia(1)
    }





/* POPUP ANIMACION */

let [statusPopup,setStatusPopup] = useState(true)





    
/* RESUMEN NUEVO */

    function setEstadoResumen(estado){
        setInputEstado(estado)
    }




/* ---------------------------------------------------------------------------------- */

/* RESUMEN PRODUCTO */
/* Estado ventana Resumen */

    let [statusSubmit,setStatusSubmit] = useState(false)

    function verResumen(status){
        setStatusSubmit(status)
    }





/* _________________________________________________________________________________________ */





    return (
        <>
            <nav className="nav-blur">


                <section className={`seccion-producto-form pop-up ${ statusPopup ? "" : "pop-out" }`} >

                    <h2 
                        className={ inputItem ? "nombre-item" : "item-vacio" }
                    >
                        { inputItem == "" ? "Nuevo producto" : inputItem }
                    </h2>
                    


                    
    {/* ------------ FORMULARIO PRODUCTO NUEVO ---------------------------------------------------------- */}

                    <form className="producto-form producto-nuevo"

                        onSubmit={ event => {

                            event.preventDefault()

                    /* ------- Validacion del formulario  */

                            if( inputItem.trim() == "" || !inputPrecio || !seleccionMercado 
                                || Number.isNaN(inputPrecioKg) 
                                || Number.isNaN(inputCantidad) || !Number.isNaN(Number(inputCantidadUd)) || inputCantidadUd.length > 4
                                || Number.isNaN(inputUnits) || inputUnits.toString().length > 3
                                || Number.isNaN(inputMax) || inputMax.toString().length > 3
                            ){

                                if( inputItem.trim() == "" ){
                                    setStatusItem(true)
                                }else{
                                    setStatusItem(false)
                                }

                                if( !seleccionMercado ){
                                    setStatusMercado(true)
                                }else{
                                    setStatusMercado(false)
                                }

                                if( inputPrecio == "" || inputPrecio == undefined ){
                                    setStatusPrecio(1)
                                }else if( Number.isNaN(inputPrecio) ){
                                    setStatusPrecio(2)
                                }else{
                                    setStatusPrecio(0)
                                }


                                if( Number.isNaN(inputPrecioKg) ){
                                    setStatusPrecioKg(true)
                                }else{
                                    setStatusPrecioKg(false)
                                }

                                if( Number.isNaN(inputCantidad) ){
                                    setStatusCantidad(true)
                                }else{
                                    setStatusCantidad(false)
                                }

                                if( !Number.isNaN(Number(inputCantidadUd)) ){
                                    setStatusCantidadUd(1)
                                }else if( inputCantidadUd.length > 4 ){
                                    setStatusCantidadUd(2)
                                }else{
                                    setStatusCantidadUd(0)
                                }

                                if( Number.isNaN(inputUnits) ){
                                    setStatusUnits(1)
                                }else if( inputUnits.toString().length > 3 ){
                                    setStatusUnits(2)
                                }else{
                                    setStatusUnits(0)
                                }

                                if( Number.isNaN(inputMax) ){
                                    setStatusMax(1)
                                }else if( inputMax.toString().length > 3 ){
                                    setStatusMax(2)
                                }else{
                                    setStatusMax(0)
                                }



                            }else{
                                verResumen(true)
                                setStatusItem(false)
                                setStatusPrecio(false)
                                setStatusPrecioKg(false)
                                setStatusMercado(false)
                                setStatusCantidad(false)
                                setStatusCantidadUd(false)
                                setStatusMax(false)
                                setStatusUnits(false)
                            }    
                        }}
                    
                    >




{/* ------------------- INPUTS ------------------------------------------------------------------------------------------------------------------------------------- */}

                        <div className="contenedor-input">


    {/* ------------------- INPUT PRODUCTO ESTADO ----------------------------------------------------------------------------------------------------------------- */}

                            <div className="input">

                                <div className="multi-input">


    {/* ------------------- INPUT PRODUCTO -------------------------------------------------------------------------------------------------------------------------- */}

                                    <div>

                                        <p className="campo-nombre campo-obligatorio">Producto<span>*</span></p>

                                        
                                        <input type="text" placeholder="Producto" 
                                            className={`input-item ${ statusItem ? "error-input" : "estado-input" }`}
                                            
                                            onChange={ event => {
                                                setInputItem(event.target.value)
                                            }}
                                        />

                                    </div>





    {/* --------------------------- INPUT ESTADO --------------------------------------------------------------------------------------------------------------------- */}

                                    <div>
                                        
                                        <p className="campo-nombre">Estado</p>


                                        <label className="input-estado">
                                            
                                            <Toggle
                                                defaultChecked={false}
                                                icons={ 
                                                    {
                                                        checked : <BiSolidFridge />,
                                                        unchecked:  <TbShoppingBagEdit />
                                                    }
                                                }
                                                onChange={ event => {
                                                    setInputEstado(!inputEstado)
                                                }}
                                            />

                                        </label>


                                    </div>


                                </div>


                                <p className="mensaje-error"
                                    style={ statusItem ? { display : "block" } : { display : "none" } }
                                >No puede estar vacío</p>


                            </div>

                            
                            
                            

    {/* ------------------- INPUT PRECIO PRECIOKG ------------------------------------------------------------------------------------------------------------------ */}

                            <div className="input">

                                <div className="multi-input">


                                {/* INPUT PRECIO -------------------------------------------------------------------------------------------------------------------- */}

                                    <div>

                                        <p className="campo-nombre campo-obligatorio">Precios<span>*</span></p>


                                        <label className="input-precio">

                                            <input type="text" placeholder="Precio"
                                                className={ statusPrecio ? "error-input" : "estado-input" }
                                                
                                                onChange={ event => {
                                                    setInputPrecio(Number(event.target.value))
                                                }}
                                            />€

                                        </label>
                                    </div>





                                {/* INPUT PRECIOKG ------------------------------------------------------------------------------------------------------------------ */}

                                    <div>

                                        <p className="campo-nombre">Precio/kg</p>


                                        <label className="input-precio">

                                            <input type="text" placeholder="Precio"
                                                className={ statusPrecioKg ? "error-input" : "estado-input" }
                                                
                                                onChange={ event => {
                                                    setInputPrecioKg(Number(event.target.value))
                                                }}
                                            />€/kg
                                        
                                        </label>

                                    </div>
                                    

                                </div>


                                <p className="mensaje-error"
                                    style={ statusPrecio == 0 && !statusPrecioKg ? { display : "none" } : { display : "block" } }
                                >
                                    {
                                        statusPrecio == 1 ? "No puede estar vacío" : ""   
                                    }
                                    {
                                        statusPrecio == 2 || ( statusPrecio == 0 && statusPrecioKg ) ? "Tiene que ser un número" : ""
                                    }
                                </p>
                            
                            </div>





    {/* ------------------- INPUT MERCADO ------------------------------------------------------------------------------------------------------------------ */}

                            <div className="input">

                                <p className="campo-nombre campo-obligatorio">Mercado<span>*</span></p>
                                

                                <select name="Mercados" id="Mercados"
                                    className={ statusMercado ? "error-input" : "estado-input" }
                                    
                                    onChange={ event => {
                                        setSeleccionMercado(event.target.value)
                                        
                                    }}
                                >

                                    <option value="" disabled selected>Mercados</option>
                                    {
                                        mercados.map( ({id,mercado}) => {
                                            return ( <option key={id} value={id}>{mercado}</option> )
                                        })
                                    }
                                    
                                </select>
                                

                                <p className="mensaje-error"
                                    style={ statusMercado ? { display : "block" } : { display : "none" } }
                                >No puede estar vacío</p>

                            </div>


                                
                                    

{/* --------------------------- MÁS OPCIONES -------------------------------------------------------------------------------------------------------------- */}
                            {
                                statusOpciones ?

                                <>

                                    <div className="input">

                                        <div className="multi-input">


                                        {/* INPUT CANTIDAD ------------------------------------------------------------------------------------------------- */}

                                            <div>
                                            
                                                <p className="campo-nombre">Cantidad</p>
                                                

                                                <div className="multi-input">
                                                
                                                    <label className="input-cantidad">
                                                    
                                                        <input type="text" list="cantidad"
                                                            className={ statusCantidad ? "error-input" : "estado-input" }

                                                            onChange={ event => {
                                                                setInputCantidad(Number(event.target.value))
                                                            }}
                                                        />

                                                        <datalist name="cantidad" id="cantidad">
                                                            {
                                                                cantidadLista.map( ({value}) => {
                                                                    return ( <option value={value} key={value} /> )
                                                                })
                                                            }
                                                        </datalist>
                                                    
                                                    </label>


                                                    <label className="input-cantidad unidad">

                                                        <input type="text" list="cantidadud" 
                                                            className={ statusCantidadUd ? "error-input" : "estado-input" }

                                                            onChange={ event => {
                                                                setInputCantidadUd(event.target.value)
                                                            }}
                                                        
                                                        />

                                                        <datalist name="cantidadud" id="cantidadud">
                                                            {
                                                                cantidadUdLista.map( ({value}) => {
                                                                    return ( <option value={value} key={value} /> )
                                                                })
                                                            }
                                                        </datalist>

                                                    </label>

                                                </div>

                                            </div>




                                        
                                        {/* INPUT UNITS ----------------------------------------------------------------------------------------------------- */}

                                            <div>

                                                <p className="campo-nombre">Units</p>
                                                
                                                <input type="text" className={ `input-single-cant ${ statusUnits != 0 ? "error-input" : "estado-input" }` }
                                                    onChange={ event => {
                                                        setInputUnits(Number(event.target.value))
                                                    }}
                                                />
                                            </div>
                                        
                                        
                                        
                                        
                                        
                                        {/* INPUT MAX -------------------------------------------------------------------------------------------------------- */}

                                            <div>
                                                <p className="campo-nombre">Max</p>
                                                <input type="text" className={ `input-single-cant ${ statusMax ? "error-input" : "estado-input" }` }
                                                    onChange={ event => {
                                                        setInputMax(Number(event.target.value))
                                                    }}
                                                />
                                            </div>


                                        </div>


                                        <p className="mensaje-error"
                                            style={ !statusCantidad && statusCantidadUd == 0 && statusUnits == 0 && statusMax == 0 ? { display : "none" } : { display : "block" } }
                                        >
                                            {
                                                statusCantidad || ( statusCantidadUd == 0 && ( statusUnits == 1 ||  ( statusUnits == 0 && statusMax == 1 ) ) ) ? "Tiene que ser número" : ""
                                            }
                                            {
                                                !statusCantidad && statusCantidadUd == 1 ? "No puede ser número" : ""
                                            }
                                            {
                                                !statusCantidad  && statusCantidadUd == 2 ? "Menos de 4 caracteres" : ""
                                            }
                                            {
                                                !statusCantidad && statusCantidadUd == 0 && ( statusUnits == 2 ||  ( statusUnits == 0 && statusMax == 2 ) ) ? "Menos de 3 caracters" : ""
                                            }
                                        </p>
                                        

                                    </div>





                                    {/* INPUT PRIORIDAD --------------------------------------------------------------------------------------------------- */}

                                    <div className="input">

                                        <p className="campo-nombre">Prioridad</p>


                                        <select name="Prioridad" id="Prioridad" className="estado-input"

                                            onChange={ event => {
                                                setSeleccionPrioridad(event.target.value)
                                            }}
                                        >

                                            <option value="" disabled selected>Prioridad</option>
                                            {
                                                prioridadLista.map( ({id,prioridad}) => {
                                                    return ( <option key={id} value={id}>{prioridad}</option> )
                                                })
                                            }

                                        </select>
                            
                                    </div>





                                    {/* INPUT TIPO --------------------------------------------------------------------------------------------------------- */}

                                    <div className="input">

                                        <p className="campo-nombre">Tipo</p>
                                        

                                        <select name="Tipo" id="Tipo" className="estado-input"

                                            onChange={ event => {
                                                setSeleccionTipo(event.target.value)
                                            }}
                                        >

                                            <option defaultValue="" disabled selected>Tipos</option>
                                            {
                                                tipos.map( ({id,tipo}) => {
                                                    return (
                                                        <option key={id} value={id}>{tipo}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                        
                                    </div>





                                    {/* INPUT FRECUENCIA --------------------------------------------------------------------------------------------------- */}

                                    <div className="input">

                                        <p className="campo-nombre">Frecuencia</p>


                                        <select name="Frecuencia" id="Frecuencia" className="estado-input"
                                            onChange={ event => {
                                                setSeleccionFrecuencia(event.target.value)
                                            }}
                                        >
                                            
                                            <option value="" disabled selected>Frecuencia</option>
                                            <option value="1">Mensual</option>
                                            <option value="2">Ocasional</option>
                                        </select>
                                    
                                    </div>
                                    

                                </>

                                : ""
                            }

                        </div>





            {/* --------- Mostrar más ------------------------------------------------------------------------------------------------------------------------- */}

                        <div className={`mostrar-mas ${ statusOpciones ? "" : "gradiente-ocultar"}`}>

                            <button className="boton-icono mostrar"
                                onClick={ event => {
                                    event.preventDefault()
                                    setStatusOpciones(!statusOpciones)
                                }}
                            >

                                { statusOpciones ? "Mostrar menos" : "Mostrar más" }
                                {
                                    statusOpciones ?
                                    <RiArrowUpWideLine className="boton-icono flecha" />
                                    :
                                    <RiArrowDownWideFill className="boton-icono flecha"/>
                                }

                            </button>
                        </div>
                            
                                



        {/* --------------- BOTONES CANCELAR / SUBMIT ----------------------------------------- */}
                            
                            <div className="seccion-botones">

                                <button type="button" className="boton cancelar"
                                    onClick={ event => {
                                        setStatusPopup(false)
                                        setTimeout( () => { crearProducto(false) },250)
                                    }}
                                >Cancelar</button>

                                
                                <input className="boton submit" type="submit" value="Aceptar"/>
                            
                            </div>


                    </form>

                </section>

            

            
{/* -------------- RESUMEN ------------------------------------------------------------------------------------------ */}

                {
                    statusSubmit ?
                    <ResumenNuevo
                        crearProducto={crearProducto}
                        verResumen={verResumen}
                        
                        addProducto={addProducto}
                        
                        producto={inputItem}
                        estado={inputEstado} setEstadoResumen={setEstadoResumen}
                        precio={inputPrecio}
                        preciokg={inputPrecioKg}
                        cantidad={inputCantidad}
                        cantidadud={inputCantidadUd}
                        max={inputMax}
                        units={inputUnits}
                        frecuencia={seleccionFrecuencia}

                        mercados={mercados} seleccionMercado={seleccionMercado}
                        prioridadLista={prioridadLista} seleccionPrioridad={seleccionPrioridad}
                        tipos={tipos} seleccionTipo={seleccionTipo}
                    />
                    : ""
                }
                
                
                
            </nav>

        </>
    )

}


export default ProductoNuevo