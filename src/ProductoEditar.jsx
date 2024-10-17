import { useState } from "react"



function ProductoEditar({editarProducto,id,
    estadoEditar,switchEditar,
    item,mercados,prioridad,selectedMercado,selectedPrioridad,precio,max,units}){

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
                        className="nombre-item"
                    >
                        { inputItem == "" ? item : inputItem }
                    </h2>
                    


                    
    {/* ------------ FORMULARIO PRODUCTO NUEVO ---------------------------------------------------------- */}

                    <form className="producto-nuevo-form"

                        onSubmit={ event => {

                            event.preventDefault()

                    /* ------- Validacion del formulario  */

                            if( inputItem.trim() == "" /*|| !seleccionMercado || !inputPrecio*/ ){
                                /*
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
*/


                            }else{

                                estadoEditar(false)
                                switchEditar(false)
                                

/* ------------------------ PETICION A LA API ---------------------------------------------------------------- */

                                fetch("http://localhost:4000/productos/editar",
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
                                    console.log(res)
                                    console.log(inputItem)
                                    console.log(id)
                                    
                                    editarProducto(
                                        {
                                            id : id,
                                            producto : inputItem
                                        }
                                    )
                                })
                            }
                        }}
                    
                    >




    {/* --------------- INPUT PRODUCTO ------------------------------------------------- */}

                        <div className="input item">

                            <p className="campo-nombre">Producto</p>

                            <input type="text" className="input-item" defaultValue={ item }
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

                            <p className="campo-nombre">Mercado</p>

                            <select name="Mercados" id="Mercados"
                                
                                onChange={ event => {
                                    setSeleccionMercado(event.target.value)
                                }}
                            >

                                <option key="0" value="" disabled selected>Mercados</option>
                                {
                                    mercados.map( ({id,mercado}) => {
                                        return ( 
                                            <option key={id} value={id}

                                                selected={ mercado == selectedMercado ? "selected" : "" }

                                            >{mercado}</option> 
                                        )
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

                                    <input type="text" className="input-precio" defaultValue={precio}
                                        
                                        onChange={ event => {
                                            setInputPrecio(Number(event.target.value))
                                        }}
                                    />€

                                </label>
                                


                            {/* INPUT MAX ------------------------------------- */}

                                <input type="text" className="input-max" defaultValue={max}
                                    onChange={ event => {
                                        setInputMax(Number(event.target.value))
                                    }}
                                />
                                


                            {/* INPUT UNITS ----------------------------------- */}

                                <input type="text" className="input-units" defaultValue={units}
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

                            <p className="campo-nombre">Prioridad</p>

                            <select name="Prioridad" id="Prioridad"

                                onChange={ event => {
                                    setSeleccionPrioridad(event.target.value)
                                }}
                            >

                                <option key="0" defaultValue="" disabled selected>Prioridad</option>
                                {
                                    prioridad.map( ({id,prioridad}) => {
                                        return ( 
                                            <option key={id} value={id}
                                                selected={ prioridad == selectedPrioridad ? "selected" : ""}
                                            >
                                            {prioridad}</option> 
                                        )
                                    })
                                }

                            </select>

                        </div>
                            



    {/* --------------- BOTONES CANCELAR / SUBMIT ----------------------------------------- */}
                        
                        <div className="seccion-botones">

                            <button type="button" className="boton-form cancelar"
                                onClick={ event => {
                                    estadoEditar(false)
                                }}
                            >Cancelar</button>



                            <input className="boton-form submit" type="submit" value="Aceptar"/>
                        
                        </div>


                    </form>

                </section>
                
            </nav>

        </>
    )

}


export default ProductoEditar