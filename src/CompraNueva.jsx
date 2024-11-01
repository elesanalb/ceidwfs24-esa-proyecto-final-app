import { useState } from "react"
import logo from './assets/cart-icon.svg'


import { MdOutlineAddPhotoAlternate } from "react-icons/md";



function CompraNueva(
    {
        crearCompra,

        addCompra,
        
        productos,
        mercados
    }
){

/* VARIABLES & HOOKS  */


    let [inputItem,setInputItem] = useState("")
    let [statusItem,setStatusItem] = useState(false)

    let [inputFecha,setInputFecha] = useState()
    let [statusFecha,setStatusFecha] = useState(false)

    let [inputTotal,setInputTotal] = useState("")
    let [statusInputTotal,setStatusInputTotal] = useState(false)

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [statusMercado,setStatusMercado] = useState(false)

    let [seleccionProductos,setSeleccionProductos] = useState([])

    let [inputUnits,setInputUnits] = useState([])
    let [inputDescuento,setInputDescuento] = useState([])
    let [statusUnits,setStatusUnits] = useState(false)
    let [statusDescuento,setStatusDescuento] = useState(false)

    let [inputFactura,setInputFactura] = useState()


    function productosLista(producto){
        setSeleccionProductos([...seleccionProductos,producto])
    }




/* POPUP ANIMACION */

let [statusPopup,setStatusPopup] = useState(true)







/* _________________________________________________________________________________________ */





    return (
        <>
            <nav className="nav-blur">


                <section className={`seccion-producto-form pop-up ${ statusPopup ? "" : "pop-out" }`} >
                    


                    
    {/* ------------ FORMULARIO PRODUCTO NUEVO ---------------------------------------------------------- */}

                    <form action="/upload" method="post" encType="multipart/form-data"
                    className="producto-form producto-nuevo nueva-compra"

                        onSubmit={ event => {

                            event.preventDefault()
                        }}
                    
                    >

                        <div className="input-factura">

                            {
                                inputFactura ? 

                                <div className="contenedor-factura uploaded-factura">
                            
                                    <div className="uploaded-img">
                                        <img src={inputFactura} alt="" />
                                    </div>

                                </div>

                                :

                                <div className="contenedor-factura upload-factura">

                                    <label for="file-upload">
                                        <MdOutlineAddPhotoAlternate className="boton-icono foto"/>
                                    </label>

                                    <input type="file" id="file-upload"
                                        onChange={ event => {
                                            setInputFactura(event.target.files)
                                        }}
                                    />

                                </div>
                            }

                            

                            
                            

                            <h2 
                                className={ inputItem ? "nombre-item" : "item-vacio" }
                            >
                                { inputItem == "" ? "Nueva compra" : inputItem }
                            </h2>

                        </div>
                        






{/* ------------------- INPUTS ------------------------------------------------------------------------------------------------------------------------------------- */}

                        <div className="contenedor-input">


    {/* ------------------- INPUT COMPRA & MERCADOS ----------------------------------------------------------------------------------------------------------------- */}

                            <div className="input">

                                <div className="multi-input">



    {/* ------------------- INPUT COMPRA -------------------------------------------------------------------------------------------------------------------------- */}

                                    <div>

                                        <p className="campo-nombre campo-obligatorio">Compra<span>*</span></p>

                                        
                                        <input type="text" placeholder="Compra" 
                                            className={`input-item ${ statusItem ? "error-input" : "estado-input" }`}
                                            
                                            onChange={ event => {
                                                setInputItem(event.target.value)
                                            }}
                                        />

                                    </div>




    
    {/* -------------------- INPUT MERCADO ------------------------------------------------------------------------------------------------------------------ */}

                                    <div>

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

                                    </div>




                                </div>


                                <p className="mensaje-error"
                                    style={ statusItem ? { display : "block" } : { display : "none" } }
                                >No puede estar vacío</p>


                            </div>

                            
                            
                            
                            


    {/* ------------------- INPUT COSTE & FECHA ------------------------------------------------------------------------------------------------------------------ */}

                            <div className="input">

                                <div className="multi-input">




    {/* -------------------- INPUT COSTE -------------------------------------------------------------------------------------------------------------------- */}

                                    <div>

                                        <p className="campo-nombre campo-obligatorio">Coste<span>*</span></p>


                                        <label className="input-precio">

                                            <input type="text" placeholder="Total"
                                                className={ statusInputTotal ? "error-input" : "estado-input" }
                                                
                                                onChange={ event => {
                                                    setInputTotal(Number(event.target.value))
                                                }}
                                            />
                                            
                                            <p className="campo-nombre">€</p>

                                        </label>
                                    </div>





    {/* -------------------- INPUT FECHA ------------------------------------------------------------------------------------------------------------------------ */}

                                    <div>

                                        <p className="campo-nombre campo-obligatorio">Fecha<span>*</span></p>


                                        <input type="date" placeholder="Fecha"
                                            className={`input-fecha ${statusFecha ? "error-input" : "estado-input"}`}
                                        />

                                    </div>
                               

                                </div>



                                <p className="mensaje-error"
                                    style={ statusInputTotal ? { display : "block" } : { display : "none" } }
                                >
                                    No puede estar vacío
                                </p>
                            

                            </div>







    {/* -------------------- INPUT PRODUCTOS --------------------------------------------------------------------------------------------------- */}

                            <div className="input">

                                <p className="campo-nombre">Productos</p>


                                <select name="Productos" id="Productos" className="estado-input"

                                    onChange={ event => {
                                        productosLista({ id : Number(event.target.value) })
                                    }}
                                >

                                    <option value="" disabled selected>Productos</option>
                                    {
                                        productos.map( ({id,producto}) => {
                                            return ( <option key={id} value={id}>{producto}</option> )
                                        })
                                    }

                                </select>

                            </div>




    {/* ------------------- LISTA PRODUCTOS, PRECIO, UNITS & DESCUENTO ------------------------------------------------------------------------------ */}

                            <div className="productos-seleccion">

                                {
                                    seleccionProductos.length < 1 ?
                                    <p className="campo-nombre">Ningún producto añadido</p>
                                    :
                                    <div className="seleccion-grid">
                                        <p className="campo-nombre seleccion-producto">Producto</p>
                                        <p className="campo-nombre seleccion-precio">Precio</p>
                                        <p className="campo-nombre input-single-cant">Ud.</p>
                                        <p className="campo-nombre input-descuento">%</p>
                                    </div>

                                }

                                
                            
                                {
                                    seleccionProductos.map( ({id}) => {
                                            return (
                                                <>

                                                    <div className="seleccion-grid">


                                                    {/* PRODUCTO & PRECIO ------------------------------------------------------------------------------------------------- */}


                                                        <div className="campo-seleccion estado-input seleccion-producto">
                                                            <p className="productos-cont">
                                                                {
                                                                    productos.filter( productos => productos.id == id ).map( ({producto}) => { return producto })
                                                                }
                                                            </p>
                                                        </div>
                                                        
                                                            
                                                        <div className="campo-seleccion estado-input seleccion-precio">
                                                            <p className="productos-cont">
                                                                {
                                                                    productos.filter( productos => productos.id == id ).map( ({precio}) => { return precio })
                                                                }
                                                                €
                                                            </p>
                                                        </div>



                                                    
                                                    {/* INPUT UNITS ----------------------------------------------------------------------------------------------------- */}

                                                        <div className="campo-seleccion">                                                        
                                                            <input type="text" className={ `input-single-cant ${ statusUnits != 0 ? "error-input" : "estado-input" }` }
                                                                onChange={ event => {
                                                                    setInputUnits(Number(event.target.value))
                                                                }}
                                                            />
                                                        </div>





                                                    {/* INPUT DESCUENTO -------------------------------------------------------------------------------------------------------- */}

                                                        <div className="campo-seleccion input-descuento">

                                                                <input type="text" className={ `${ statusDescuento ? "error-input" : "estado-input" }` }
                                                                    onChange={ event => {
                                                                        setInputDescuento(Number(event.target.value))
                                                                    }}
                                                                />

                                                                <p className="campo-nombre">%</p>
                                                        </div>


                                                    </div>
                                                
                                                </>
                                            )
                                        
                                    })
                                }
                                
                            </div>

                                        
                        </div>






        {/* --------------- BOTONES CANCELAR / SUBMIT ----------------------------------------- */}
                            
                            <div className="seccion-botones">

                                <button type="button" className="boton cancelar"
                                    onClick={ event => {
                                        setStatusPopup(false)
                                        setTimeout( () => { crearCompra(false) },250)
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


export default CompraNueva