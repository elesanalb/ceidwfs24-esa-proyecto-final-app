import { useState } from "react"

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { RiArrowDownWideFill } from "react-icons/ri";
import { RiArrowUpWideLine } from "react-icons/ri";
import { BiSolidFridge } from "react-icons/bi";
import { TbShoppingBagEdit } from "react-icons/tb";






function ProductoEditar(
    {
        switchEditar,
        verProducto,

        editarProducto,
        editarProductoEstado,
        editarProductoPrecio,
        editarProductoPrecioKg,
        editarProductoCantidad,
        editarProductoUnits,
        editarProductoMax,
        editarProductoMercado,
        editarProductoPrioridad,
        editarProductoTipo,
        editarProductoFrecuencia,
        
        
        id,producto,estado,precio,precioKg,units,max,frecuencia,
        cantidadLista,cantidadUdLista,productoInfoCantidad,productoInfoCantidadUd,
        mercados,productoMercado,
        prioridadLista,productoPrioridad,
        tipos,productoTipo,
    }
){


/* VARIABLES & HOOKS  */

    let [inputItem,setInputItem] = useState()
    let [statusItem,setStatusItem] = useState(false)

    let [inputEstado,setInputEstado] = useState(false)

    let [inputPrecio,setInputPrecio] = useState()
    let [inputPrecioKg,setInputPrecioKg] = useState()
    let [statusPrecio,setStatusPrecio] = useState(0)
    let [statusPrecioKg,setStatusPrecioKg] = useState(0)

    let [inputCantidad,setInputCantidad] = useState()
    let [inputCantidadUd,setInputCantidadUd] = useState()
    let [statusCantidad,setStatusCantidad] = useState(false)
    let [statusCantidadUd,setStatusCantidadUd] = useState(0)

    let [inputMax,setInputMax] = useState()
    let [inputUnits,setInputUnits] = useState()
    let [statusMax,setStatusMax] = useState(0)
    let [statusUnits,setStatusUnits] = useState(0)
    

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [seleccionPrioridad,setSeleccionPrioridad] = useState()
    let [seleccionTipo,setSeleccionTipo] = useState()
    let [seleccionFrecuencia,setSeleccionFrecuencia] = useState()

    let [statusOpciones,setStatusOpciones] = useState(false)




/* POPUP ANIMACION */

    let [statusPopup,setStatusPopup] = useState(true)





/* _____________________________________________________________________________________________________________________ */





    return (
        <>
            <nav className="nav-blur segundo-popup">


                <section className={`seccion-producto-form pop-up ${ statusPopup ? "" : "pop-out" }`} >

                    <h2 
                        className="nombre-item"
                    >
                        { inputItem ? inputItem :  producto}
                    </h2>
                    


                    
    {/* ------------ FORMULARIO PRODUCTO NUEVO ---------------------------------------------------------- */}

                    <form className="producto-form"

                        onSubmit={ event => {

                            event.preventDefault()
                    
/* -------------------- PETICION A LA API ------------------------------------------------------------------------------------------------------------ */

/* ------------------------ EDITAR PRODUCTO NOMBRE ------------------------------------------------------------------------------------------------- */

                            if( inputItem == undefined || inputItem == producto ){
                                event.preventDefault()
                                setInputItem(producto)
                                setStatusItem(false)
                                //console.log("PRODUCTO undefined / mismo")

                            }else if( inputItem.trim() == "" ){
                                event.preventDefault()
                                setStatusItem(true)
                                //console.log("PRODUCTO vacío")



                            }else if( inputItem.trim() != "" && inputItem != producto ){

                                fetch("http://localhost:4000/productos/editar/producto",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                producto : inputItem
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {         
                                    editarProducto(
                                        {
                                            id : id,
                                            producto : inputItem
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                    
                                    setStatusItem(false)
                                })
                            }





/* ------------------------ ESTADO PRODUCTO ESTADO ---------------------------------------------------------------------------------------------------------- */
                            if( inputEstado == undefined || inputEstado == estado ){
                                event.preventDefault()
                                setInputEstado(estado)



                            }else{

                                fetch("http://localhost:4000/productos/editar/estado",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                estado : inputEstado
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
                                            estado : inputEstado
                                        }
                                    )*/

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                })
                            }





/* ------------------------ EDITAR PRODUCTO PRECIO ----------------------------------------------------------------------------------------------------- */
                            
                            if( inputPrecio == undefined || inputPrecio == precio ){
                                event.preventDefault()
                                setStatusPrecio(0)
                                setInputPrecio(precio)
                                //console.log("PRECIO undefined / mismo")

                            }
                            else if( inputPrecio == "" ){
                                event.preventDefault()
                                setStatusPrecio(1)
                                //console.log("PRECIO vacío")

                            }else if( Number.isNaN(inputPrecio) ){
                                event.preventDefault()
                                setStatusPrecio(2)
                                //console.log("PRECIO no es número")



                            }else if( inputPrecio && inputPrecio != precio ){

                                fetch("http://localhost:4000/productos/editar/precio",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                precio : inputPrecio
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {         
                                    editarProductoPrecio(
                                        {
                                            id : id,
                                            precio : inputPrecio
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                
                                    setStatusPrecio(0)                                    
                                })
                            }


/* ------------------------ EDITAR PRODUCTO PRECIOKG ------------------------------------------------------------------------------------------------- */
                            
                            if( inputPrecioKg == undefined || inputPrecioKg == precioKg ){
                                event.preventDefault()
                                setStatusPrecioKg(0)
                                setInputPrecioKg(precioKg)

                            }else if( inputPrecioKg == "" ){
                                event.preventDefault()
                                setStatusPrecioKg(1)

                            }else if( Number.isNaN(inputPrecioKg) ){
                                event.preventDefault()
                                setStatusPrecioKg(2)

                            }
                            else if( inputPrecioKg && inputPrecioKg != precioKg ){

                                fetch("http://localhost:4000/productos/editar/preciokg",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                preciokg : inputPrecioKg
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoPrecioKg(
                                        {
                                            id : id,
                                            preciokg : inputPrecioKg
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)

                                    setStatusPrecioKg(0)
                                })
                            }
                                    



                            
/* ----------------------- EDITAR PRODUCTO MERCADO -------------------------------------------------------------------------------------------------- */

                            if( seleccionMercado == undefined || seleccionMercado == productoMercado ){
                                event.preventDefault()
                                setSeleccionMercado(productoMercado)
                                //console.log("MERCADO undefined/mismo")



                            }else if( seleccionMercado && seleccionMercado != productoMercado ){
                                
                                fetch("http://localhost:4000/productos/editar/mercado",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            { 
                                                id : id,
                                                mercado : seleccionMercado 
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoMercado(
                                        {
                                            id : id,
                                            mercado : mercados.filter( (mercados) => mercados.id == seleccionMercado ).pop().mercado
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)


                                })
                            }
                            





/* ------------------------ EDITAR PRODUCTO CANTIDAD ---------------------------------------------------------------------------------------------------------- */

                            if(    !inputCantidad || inputCantidad == ""
                                || !inputCantidadUd || inputCantidadUd == "" || inputCantidadUd.length > 4 || !Number.isNaN(Number(inputCantidadUd))
                            ){
                                event.preventDefault()

                                if( inputCantidad == undefined || inputCantidad == "" || inputCantidad == productoInfoCantidad ){
                                    setStatusCantidad(false)
                                    setInputCantidad(productoInfoCantidad)
                                    
                                }else if( Number.isNaN(inputCantidad) ){
                                    setStatusCantidad(true)

                                }

                                if( inputCantidadUd == undefined || inputCantidadUd.trim() == "" || inputCantidadUd == productoInfoCantidadUd ){
                                    setStatusCantidadUd(0)
                                    setInputCantidadUd(productoInfoCantidadUd)

                                }else if( !Number.isNaN(Number(inputCantidadUd)) ){
                                    setStatusCantidadUd(1)

                                }else if( inputCantidadUd.length > 4 ){
                                    setStatusCantidadUd(2)
                                }


                            }else if( inputCantidad == productoInfoCantidad && inputCantidadUd == productoInfoCantidadUd ){
                                event.preventDefault()
                                setStatusCantidad(false)
                                setStatusCantidadUd(false)



                            }else if(  ( inputCantidad && inputCantidad != productoInfoCantidad ) 
                                    && ( inputCantidadUd && inputCantidadUd != productoInfoCantidadUd ) 
                            ){
                                
                                fetch("http://localhost:4000/productos/editar/cantidad",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                cantidad : inputCantidad,
                                                cantidadud : inputCantidadUd
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoCantidad(
                                        {
                                            id : id,
                                            cantidad : inputCantidad + inputCantidadUd,
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)

                                    setStatusCantidad(false)
                                    setStatusCantidadUd(0)
                                })



                            }else if(  ( inputCantidad && inputCantidad != productoInfoCantidad )
                                    && ( !inputCantidadUd || inputCantidadUd == "" || inputCantidadUd == productoInfoCantidadUd || inputCantidadUd.length > 4 || !Number.isNaN(Number(inputCantidadUd)) )
                            ){
                              
                                fetch("http://localhost:4000/productos/editar/cantidad",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                cantidad : inputCantidad,
                                                cantidadud : productoInfoCantidadUd
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoCantidad(
                                        {
                                            id : id,
                                            cantidad : inputCantidad + productoInfoCantidadUd
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)

                                    setStatusCantidad(false)
                                    setStatusCantidadUd(0)
                                })



                            }else if(  ( inputCantidadUd || inputCantidadUd != productoInfoCantidadUd) 
                                    && ( !inputCantidad || inputCantidad == "" || inputCantidad == productoInfoCantidad )
                            ){

                                fetch("http://localhost:4000/productos/editar/cantidad",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                cantidad : productoInfoCantidad,
                                                cantidadud : inputCantidadUd
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoCantidad(
                                        {
                                            id : id,
                                            cantidad : productoInfoCantidad + inputCantidadUd
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                    
                                    setStatusCantidad(false)
                                    setStatusCantidadUd(0)
                                })
                            }





/* ------------------------ EDITAR PRODUCTO MAX ------------------------------------------------------------------------------------------------- */
                            
                            if( inputMax == undefined || inputMax == "" || inputMax == max ){
                                event.preventDefault()
                                setStatusMax(0)
                                setInputMax(max)
                                //console.log("MAX undefined/mismo")

                            }else if( Number.isNaN(inputMax) ){
                                event.preventDefault()
                                setStatusMax(1)
                                //console.log("MAX no es número")

                            }else if( inputMax.toString().length > 3 ){
                                event.preventDefault()
                                setStatusMax(2)

                            }else if( inputMax && inputMax != max && inputMax.toString().length < 3 ){

                                fetch("http://localhost:4000/productos/editar/max",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                max : inputMax
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {         
                                    editarProductoMax(
                                        {
                                            id : id,
                                            max : inputMax
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)

                                    setStatusMax(0)
                                })
                            }





/* ------------------------ EDITAR PRODUCTO UNITS ------------------------------------------------------------------------------------------------- */
                            
                            if( inputUnits == undefined || inputUnits == "" || inputUnits == units ){
                                event.preventDefault()
                                setStatusUnits(0)
                                setInputUnits(units)

                            }else if( Number.isNaN(inputUnits) ){
                                event.preventDefault()
                                setStatusUnits(1)

                            }else if( inputUnits.toString().length > 3 ){
                                event.preventDefault()
                                setStatusUnits(2)



                            }else if( inputUnits && inputUnits != units && inputUnits.toString().length < 3 ){

                                fetch("http://localhost:4000/productos/editar/units",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                units : inputUnits
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoUnits(
                                        {
                                            id : id,
                                            units : inputUnits
                                        }
                                    )

                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)

                                    setStatusMax(0)
                                })
                            }





/* ------------------------ EDITAR PRODUCTO PRIORIDAD ------------------------------------------------------------------------------------------------ */

                            if( seleccionPrioridad == undefined || seleccionPrioridad == productoPrioridad ){
                                event.preventDefault()
                                setSeleccionPrioridad(productoPrioridad)
                                //console.log("PRIORIRDAD undefined/misma")
                                

                                
                            }else if( seleccionPrioridad != productoPrioridad ){

                                fetch("http://localhost:4000/productos/editar/prioridad",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                prioridad : seleccionPrioridad
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoPrioridad(
                                        {
                                            id : id,
                                            prioridad : prioridadLista.filter( (prioridad) => prioridad.id == seleccionPrioridad ).pop().prioridad
                                        }
                                    )

                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                })
                            }





/* ------------------------- EDITAR PRODUCTO TIPO ----------------------------------------------------------------------------------------------------- */

                            if( seleccionTipo == undefined || seleccionTipo == productoTipo ){
                                event.preventDefault()
                                setSeleccionTipo(productoTipo)



                            }else if( seleccionTipo != productoTipo ){
                               
                                fetch("http://localhost:4000/productos/editar/tipo",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                tipo : seleccionTipo
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoTipo(
                                        {
                                            id : id,
                                            tipo : seleccionTipo
                                        }
                                    )

                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                })
                            }





/* ------------------------- EDITAR PRODUCTO FRECUENCIA ------------------------------------------------------------------------------------------------- */

                            if( seleccionFrecuencia == undefined || seleccionFrecuencia == frecuencia ){
                                event.preventDefault()
                                setSeleccionFrecuencia(frecuencia)



                            }else if( seleccionFrecuencia != frecuencia ){
                            
                                fetch("http://localhost:4000/productos/editar/frecuencia",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                frecuencia : seleccionFrecuencia
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductoFrecuencia(
                                        {
                                            id : id,
                                            frecuencia : seleccionFrecuencia
                                        }
                                    )

                                    setTimeout( () => { 
                                        switchEditar(false)
                                        verProducto(false)
                                    },250)
                                })
                            }


                        }}
                    >






{/* ---------------------- INPUTS -------------------------------------------------------------------------------------------------------------------------------------Z */}

                        <div className="contenedor-input">

                        

                            <div className="input">

                                <div className="multi-input">


    {/* ----------------------- INPUT PRODUCTO ------------------------------------------------------------------------------------------------- */}

                                    <div>

                                        <p className="campo-nombre">Producto</p>

                                        <input type="text" defaultValue={ producto }
                                            className={ `input-item ${ statusItem ? "error-input" : "estado-input" }`}

                                            onChange={ event => {
                                                setInputItem(event.target.value)
                                            }}
                                        />

                                    </div>


                                  


    {/* ----------------------- INPUT ESTADO ----------------------------------------------------------------------------------------------------- */}

                                    <div>

                                        <p className="campo-nombre">Estado</p>


                                        <label className="input-estado">
                                            
                                            <Toggle
                                                defaultChecked={estado}
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




    {/* ------------------- INPUT PRECIO KG ----------------------------------------------------------------------------------------- */}

                            <div className="input">

                                <div className="multi-input">


                                {/* INPUT PRECIO ------------------------------------------------------------------------------------------ */}

                                    <div>

                                        <p className="campo-nombre">Precio</p>


                                        <label className="input-precio">

                                            <input type="text" defaultValue={precio}
                                                className={ statusPrecio ? "error-input" : "estado-input" }
                                                
                                                onChange={ event => {
                                                    setInputPrecio(Number(event.target.value))
                                                }}
                                                
                                            />€

                                        </label>
                                    </div>


                                

                                {/* INPUT PRECIO KG------------------------------------------------------------------------------------------ */}

                                    <div>

                                        <p className="campo-nombre">Precio/Kg</p>


                                        <label className="input-precio">

                                            <input type="text" defaultValue={precioKg}
                                                className={ statusPrecioKg ? "error-input" : "estado-input" }

                                                onChange={ event => {
                                                    setInputPrecioKg(Number(event.target.value))
                                                }}
                                            
                                            />€/kg

                                        </label>
                                    </div>


                                </div>


                                <p className="mensaje-error"
                                    style={ statusPrecio == 0 && statusPrecioKg == 0 ? { display : "none" } : { display : "block" } }
                                >
                                    {
                                        statusPrecio == 1 || statusPrecioKg == 1 ? "No puede estar vacío" : ""   
                                    }
                                    {
                                        statusPrecio == 2 || statusPrecioKg == 2 ? "Tiene que ser un número" : ""
                                    }
                                </p>

                            </div>




    {/* ------------------- INPUT MERCADO ------------------------------------------------------------------------------------------------- */}

                            <div className="input">

                                <p className="campo-nombre">Mercado</p>


                                <select name="Mercados" id="Mercados" className="estado-input"
                                    
                                    onChange={ event => {
                                        setSeleccionMercado(event.target.value)
                                    }}
                                >

                                    <option value="" disabled selected>Mercados</option>
                                    {
                                        mercados.map( ({id,mercado}) => {
                                            return ( 
                                                <option key={id} value={id}
                                                /* Selecciona según si el nombre del mercado es el mismo que el mercado que le llega desde Producto.jsx */
                                                    selected={ id == productoMercado ? "selected" : "" }
                                                >{mercado}</option> 
                                            )
                                        })
                                    }
                                    
                                </select>

                            </div>







{/* ----------------- MÁS OPCIONES ---------------------------------------------------------------------------------------------------------------- */}

                            {
                                statusOpciones ?

                                <>

            {/* --------------- INPUT CANTIDAD MAX UNITS ---------------------------------------------------------------------------------------------- */}

                                    <div className="input">

                                        <div className="multi-input">



                                        {/* INPUT CANTIDAD --------------------------------------------------------------------------------------------- */}
                                            <div>

                                                <p className="campo-nombre">Cantidad</p>


                                                <div className="multi-input">

                                                    <label className="input-cantidad">
                                                        
                                                        <input type="text" list="cantidad" defaultValue={productoInfoCantidad}
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

                                                        <input type="text" list="cantidadud" defaultValue={productoInfoCantidadUd}
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






                                        {/* INPUT UNITS ---------------------------------------------------------------------------------------------- */}

                                            <div>

                                                <p className="campo-nombre">Units</p>

                                                
                                                <input type="text" defaultValue={units}
                                                    className={ `input-single-cant ${ statusMax ? "error-input" : "estado-input" }` }

                                                    onChange={ event => {
                                                        setInputUnits(Number(event.target.value))
                                                    }}
                                                />
                                                
                                            </div>






                                        {/* INPUT MAX --------------------------------------------------------------------------------------------- */}

                                            <div>

                                                <p className="campo-nombre">Max</p>


                                                <input type="text" defaultValue={max}
                                                    className={ `input-single-cant ${ statusMax ? "error-input" : "estado-input" }` }

                                                    onChange={ event => {
                                                        setInputMax(Number(event.target.value))
                                                    }}
                                                />

                                            </div>


                                        </div>


                                        <p className="mensaje-error"
                                            style={ !statusCantidad && statusCantidadUd == 0 && statusMax == 0 ? { display : "none" } : { display : "block" } }
                                        >
                                            {
                                                statusCantidad || ( statusCantidadUd == 0 && ( statusUnits == 1 || ( statusUnits == 0 && statusMax == 1 ) ) ) ? "Tiene que ser número" : ""
                                            }
                                            {
                                                !statusCantidad && statusCantidadUd == 1 ? "No puede ser número" : ""
                                            }
                                            {
                                                !statusCantidad && statusCantidadUd == 2 ? "Menos de 4 caracteres" : ""
                                            }
                                            {
                                                !statusCantidad && statusCantidad == 0 && ( statusUnits == 2 || ( statusUnits == 0 && statusMax == 2 ) ) ? "Menos de 3 caracteres" : ""
                                            }
                                        </p>


                                    </div>
                                    
                                    



            {/* --------------- INPUT PRIORIDAD ---------------------------------------------------------------------------------------------- */}

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
                                                    return ( 
                                                        <option key={id} value={id}
                                                            selected={ id == productoPrioridad ? "selected" : ""}
                                                        >
                                                        {prioridad}</option> 
                                                    )
                                                })
                                            }

                                        </select>

                                    </div>




            {/* ---------------- INPUT TIPO ---------------------------------------------------------------------------------------------------- */}
                                    <div className="input">
                                        
                                        <p className="campo-nombre">Tipo</p>

                                        <select name="Tipo" id="Tipo" className="estado-input"
                                            onChange={ event => {
                                                setSeleccionTipo(event.target.value)
                                            }}
                                        >

                                            <option key="0" value="" disabled selected>Tipos</option>
                                            {
                                                tipos.map( ({id,tipo}) => {
                                                    return (
                                                        <option key={id} value={id}
                                                            selected={ id == productoTipo ? "selected" : "" }
                                                        >{tipo}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>




            {/* ----------------- INPUT FRECUENCIA --------------------------------------------------------------------------------------------------- */}

                                    <div className="input">
                                        
                                        <p className="campo-nombre">Frecuencia</p>

                                        
                                        <select name="Frecuencia" id="Frecuencia" className="estado-input"
                                            onChange={ event => {
                                                setSeleccionFrecuencia(event.target.value)
                                            }}
                                        >
                                            <option value="" disabled selected>Frecuencia</option>
                                            <option value="1" selected={ frecuencia == 1 ? "selected" : "" }>Mensual</option>
                                            <option value="2" selected={ frecuencia == 2 ? "selected" : "" }>Ocasional</option>
                                        </select>

                                    </div>


                                </>
                                : ""
                            }

                        </div>



    
    
    {/* --------------- Mostrar más --------------------------------------------------------------------------------------------------- */}
                        
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



    {/* --------------- Mensaje -------------------------------------------------------------------------------- */}

                        <div className="input">
                            <p className="mensaje-aviso">No se pueden dejar los campos obligatorios vacíos. El resto de campos que se dejen vacíos volverán a sus valores anteriores.</p>
                        </div>



    {/* --------------- BOTONES CANCELAR / SUBMIT ----------------------------------------- */}
                        
                        <div className="seccion-botones">

                            <button type="button" className="boton cancelar"
                                onClick={ event => {
                                    setStatusPopup(false)
                                    setTimeout( () => { 
                                        switchEditar(false)
                                    },250)
                                }}
                            >Cancelar</button>



                            <input className="boton submit" type="submit" value="Aceptar"/>
                        
                        </div>


                    </form>

                </section>
                
            </nav>

        </>
    )

}


export default ProductoEditar