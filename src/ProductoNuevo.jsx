import { useState } from "react"
import { Link } from "react-router-dom"
import ResumenNuevo from "./ResumenNuevo.jsx"



function ProductoNuevo({addProducto,mercados,prioridad}){

    /* VARIABLES & HOOKS  */

    let [inputItem,setInputItem] = useState("")
    let [statusItem,setStatusItem] = useState(false)

    let [inputPrecio,setInputPrecio] = useState()
    let [statusPrecio,setStatusPrecio] = useState(0)

    let [inputMax,setInputMax] = useState()
    let [inputUnits,setInputUnits] = useState()

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [statusMercado,setStatusMercado] = useState(false)

    let [seleccionPrioridad,setSeleccionPrioridad] = useState()

    let [statusSubmit,setStatusSubmit] = useState(false)


    /* Valores por defecto */

    if( !seleccionPrioridad ){
        setSeleccionPrioridad(1)
    }
    if( inputMax == "" || !inputMax ){
        setInputMax(1)
    }
    if( inputUnits == "" || !inputUnits ){
        setInputUnits(1)
    }




/* FUNCIONES */

    function switchStatus(status){
        setStatusSubmit(status)
    }




/* _________________________________________________________________________________________ */



    return (
        <>
            <nav className="nav-blur">

            

            
                <section className="producto-nuevo pop-up" >

                    <h2 
                        className={ inputItem ? "item-vacio" : "nombre-item" }
                    >
                        { inputItem == "" ? "Nuevo producto" : inputItem }
                    </h2>
                    


                    
    {/* ------------ FORMULARIO PRODUCTO NUEVO ---------------------------------------------------------- */}

                    <form className="producto-nuevo-form"

                        onSubmit={ event => {

                            event.preventDefault()

                    /* ------- Validacion del formulario  */

                            if( inputItem.trim() == "" || !seleccionMercado || !inputPrecio ){

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

                                if( inputPrecio == undefined ){
                                    setStatusPrecio(1)
                                }else if(!inputPrecio ){
                                    setStatusPrecio(2)
                                }
                                else{
                                    setStatusPrecio(0)
                                }



                            }else{
                                setStatusSubmit(true)
                            }    
                        }}
                    
                    >




    {/* --------------- INPUT PRODUCTO ------------------------------------------------- */}

                        <div className="input item">

                            <input type="text" placeholder="Producto" className="input-item"
                                
                                onChange={ event => {
                                    setInputItem(event.target.value)
                                }}
                            />

                            <p className="mensaje-error"
                                style={ statusItem ? { display : "block" } : { display : "none" } }
                            >No puede estar vacío</p>

                        </div>
                        
                        
                        

    {/* --------------- INPUT MERCADO --------------------------------------------------- */}

                        <div className="input mercado">

                            <select name="Mercados" id="Mercados"
                                
                                onChange={ event => {
                                    setSeleccionMercado(event.target.value)
                                }}
                            >

                                <option key="0" value="" disabled selected>Mercados</option>
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
                        
                        
                        

    {/* --------------- INPUT PRECIO MAX UNIT -------------------------------------------- */}

                        <div className="input">

                            <div className="precio-max-units">


                            {/* INPUT PRECIO -------------------------------- */}

                                <label className="input-precio">

                                    <input type="text" placeholder="Precio" className="input-precio"
                                        
                                        onChange={ event => {
                                            setInputPrecio(Number(event.target.value))
                                        }}
                                    />€

                                </label>
                                


                            {/* INPUT MAX ------------------------------------- */}

                                <input type="text" placeholder="Max" className="input-max"
                                    onChange={ event => {
                                        setInputMax(Number(event.target.value))
                                    }}
                                />
                                


                            {/* INPUT UNITS ----------------------------------- */}

                                <input type="text" placeholder="Units" className="input-units"
                                    onChange={ event => {
                                        setInputUnits(Number(event.target.value))
                                    }}
                                />



                            </div>


                            <p className="mensaje-error"
                                style={ statusPrecio == 0 ? { display : "none" } : { display : "block" } }
                            >
                                {
                                    statusPrecio == 1 ? "No puede estar vacío" : "Tiene que ser un número"   
                                }
                            </p>

                        </div>
                        



    {/* --------------- INPUT PRIORIDAD --------------------------------------------------- */}

                        <div className="input prioridad">

                            <select name="Prioridad" id="Prioridad"

                                onChange={ event => {
                                    setSeleccionPrioridad(event.target.value)
                                }}
                            >

                                <option key="0" defaultValue="" disabled selected>Prioridad</option>
                                {
                                    prioridad.map( ({id,prioridad}) => {
                                        return ( <option key={id} value={id}>{prioridad}</option> )
                                    })
                                }

                            </select>

                        </div>
                            



    {/* --------------- BOTONES CANCELAR / SUBMIT ----------------------------------------- */}
                        
                        <div className="seccion-botones">

                            <button type="button" className="boton-form cancelar">
                                <Link to={"/productos"}>Cancelar</Link>
                            </button>

                            
                            <input className="boton-form submit" type="submit" value="Aceptar"/>
                        
                        </div>


                    </form>

                </section>

            

                <ResumenNuevo
                    addProducto={addProducto}
                    switchStatus={switchStatus}
                    status={statusSubmit}
                    item={inputItem}
                    precio={inputPrecio}
                    mercados={mercados} seleccionMercado={seleccionMercado}
                    prioridad={prioridad} seleccionPrioridad={seleccionPrioridad}
                    max={inputMax}
                    units={inputUnits}
                />
                
                
            </nav>

        </>
    )

}


export default ProductoNuevo