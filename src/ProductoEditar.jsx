import { useState } from "react"

import CustomDropDown from "./CustomDropDown";
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
        editarProductoMercado,
        editarProductoPrecio,
        editarProductoPrioridad,
        editarProductoMax,
        
        id,producto,precio,
        mercados,productoMercado,
        prioridadLista,productoPrioridad,
        tipos,productoTipo,
        max,units
    }
){


/* VARIABLES & HOOKS  */

    let [inputItem,setInputItem] = useState()
    let [editProducto,setEditProducto] = useState()
    let [statusItem,setStatusItem] = useState(false)

    let [inputEstado,setInputEstado] = useState(false)

    let [inputPrecio,setInputPrecio] = useState()
    let [editPrecio,setEditPrecio] = useState()
    let [statusPrecio,setStatusPrecio] = useState(0)

    let [inputMax,setInputMax] = useState()
    let [statusMax,setStatusMax] = useState(false)

    let [inputUnits,setInputUnits] = useState()

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [seleccionPrioridad,setSeleccionPrioridad] = useState()
    let [seleccionTipo,setSeleccionTipo] = useState()

    let [statusOpciones,setStatusOpciones] = useState(false)





/* _____________________________________________________________________________________________________________________ */





    return (
        <>
            <nav className="nav-blur segundo-popup">


                <section className="seccion-producto-form pop-up" >

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
                                switchEditar(false)
                                verProducto(false)
                                setStatusItem(false)
                                //console.log("editar PRODUCTO")


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
                                })
                            }





/* ------------------------ EDITAR PRODUCTO PRECIO ------------------------------------------------------------------------------------------------- */
                            
                            if( inputPrecio == undefined || inputPrecio == precio ){
                                event.preventDefault()
                                setInputPrecio(precio)
                                setStatusPrecio(0)
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
                                switchEditar(false)
                                verProducto(false)
                                setStatusPrecio(0)
                                //console.log("editar PRECIO")

                                
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
                                })
                            }
                                    



                            
/* ----------------------- EDITAR PRODUCTO MERCADO -------------------------------------------------------------------------------------------------- */

                            if( seleccionMercado == undefined || seleccionMercado == productoMercado ){
                                event.preventDefault()
                                setSeleccionMercado(productoMercado)
                                //console.log("MERCADO undefined/mismo")



                            }else if( seleccionMercado && seleccionMercado != productoMercado ){
                                switchEditar(false)
                                verProducto(false)
                                //console.log("editar MERCADO")

                                
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
                                })
                            }





/* ------------------------ EDITAR PRODUCTO PRIORIDAD --------------------------------------------------------------------------------------------------------- */

                            if( seleccionPrioridad == undefined || seleccionPrioridad == productoPrioridad ){
                                event.preventDefault()
                                setSeleccionPrioridad(productoPrioridad)
                                //console.log("PRIORIRDAD undefined/misma")
                                

                                
                            }else if( seleccionPrioridad != productoPrioridad ){
                                switchEditar(false)
                                verProducto(false)
                                //console.log("editar PRIORIDAD")


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
                                })
                            }





/* ------------------------ EDITAR PRODUCTO MAX ------------------------------------------------------------------------------------------------- */
                            
                            if( inputMax == undefined || inputMax == "" || inputMax == max ){
                                event.preventDefault()
                                setInputMax(max)
                                setStatusMax(false)
                                //console.log("MAX undefined/mismo")

                            }else if( Number.isNaN(inputMax) ){
                                event.preventDefault()
                                setStatusMax(true)
                                //console.log("MAX no es número")



                            }else if( inputMax && inputMax != max ){
                                switchEditar(false)
                                verProducto(false)
                                setStatusMax(0)
                                //console.log("editar MAX")


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

                                        <input type="text" className="input-item" defaultValue={ producto }
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
                                                defaultChecked={inputEstado}
                                                icons={ 
                                                    {
                                                        checked : <BiSolidFridge />,
                                                        unchecked:  <TbShoppingBagEdit />
                                                    }
                                                }
                                                onChange={ event => {
                                                    setInputEstado(!inputEstado)
                                                    console.log(inputEstado)
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

                                            <input type="text" defaultValue={precio}
                                                
                                                onChange={ event => {
                                                    //setInputPrecio(Number(event.target.value))
                                                }}
                                            />€/kg

                                        </label>
                                    </div>


                                </div>


                                <p className="mensaje-error"
                                    style={ statusPrecio == 0 ? { display : "none" } : { display : "block" } }
                                >
                                    {
                                        statusPrecio == 1 ? "No puede estar vacío" : "Tiene que ser un número"   
                                    }
                                </p>

                            </div>




    {/* ------------------- INPUT MERCADO ------------------------------------------------------------------------------------------------- */}

                            <div className="input">

                                <p className="campo-nombre">Mercado</p>


                                <select name="Mercados" id="Mercados"
                                    
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
                                                        <CustomDropDown 
                                                        option={[["1"], ["2"]]}/>
                                                    </label>
                                                    

                                                    <label className="input-cantidad unidad">
                                                        <CustomDropDown />
                                                    </label>
                                                    
                                                </div>
                                                

                                            </div>




                                        {/* INPUT MAX --------------------------------------------------------------------------------------------- */}

                                                <div>
                                                    <p className="campo-nombre">Max</p>
                                                    <input type="text" className="input-single-cant" defaultValue={max}
                                                        onChange={ event => {
                                                            setInputMax(Number(event.target.value))
                                                        }}
                                                    />
                                                </div>




                                        {/* INPUT UNITS ---------------------------------------------------------------------------------------------- */}

                                            <div>
                                                <p className="campo-nombre">Units</p>
                                                <input type="text" className="input-single-cant" defaultValue={units}
                                                    onChange={ event => {
                                                        setInputUnits(Number(event.target.value))
                                                    }}
                                                />
                                            </div>


                                        </div>


                                        <p className="mensaje-error"
                                            style={ statusPrecio == 0 ? { display : "none" } : { display : "block" } }
                                        >
                                            {
                                                statusPrecio == 1 ? "No puede estar vacío" : "Tiene que ser un número"   
                                            }
                                        </p>
                                    </div>
                                    
                                    



            {/* --------------- INPUT PRIORIDAD ---------------------------------------------------------------------------------------------- */}

                                    <div className="input">

                                        <p className="campo-nombre">Prioridad</p>


                                        <select name="Prioridad" id="Prioridad"

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

                                        <select name="Tipo" id="Tipo">

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

                                        
                                        <select name="Frecuencia" id="Frecuencia">
                                            <option value="" disabled selected>Frecuencia</option>
                                            <option value="1">Mensual</option>
                                            <option value="2">Ocasional</option>

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
                                    switchEditar(false)
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