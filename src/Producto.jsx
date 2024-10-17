import { useState } from "react"
import ProductoEditar from "./ProductoEditar.jsx";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";





function Producto(
    {   
        delProducto,
        editarProducto,
        id,
        item,precio,mercados,seleccionMercado,prioridad,seleccionPrioridad,max,units,
        switchEditar,status
    }
){

/* VARIABLES & HOOKS  */

    let [maxCompra,setMaxCompra] = useState([false,false])

    let [statusEditar,setStatusEditar] = useState(false)
    



/* FUNCIONES */

    function estadoEditar(estado){
        setStatusEditar(estado)
    }





/* _______________________________________________________________________________________________________*/



    return (
        <>
            <nav className="nav-blur"
                style={ status ? { display : "flex" } : { display : "none" } }
            >

            {/* Tap fuera para salir de la ventana -------------------------------------- */}
            
                <div className="tap-fuera"
               
               onClick={ event => {
                        switchEditar(false)
                    }}
                ></div>
                
            {/* ----------------------------------------------------------------------------- */}

                <div className="resumen pop-up">





{/* ------------------- BORRAR ----------------------------------------------------------------------------- */}
                        
                    <div className="seccion-botones" style={{ margin : "0 0 20px" }}>

                        <IoMdClose className="boton-cerrar"
                            onClick={ event => {
                                switchEditar(false)
                            }}
                        />



                        <button type="button" className="boton-icono boton-borrar"

                            onClick={ event => {
                                switchEditar(false)

                                
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
                        ><FaTrash /></button>

                    </div>
                    




{/* ------------------------------------------------------------------------------------------------------------------ */}

                    <h4>Resumen del producto:</h4>



                    <div className="info-producto">
                        <h2>{item}</h2>
                    </div>
                    
                    

{/* --------------- TAGS ------------------------------------------------------------------- */}
                    
                    <div className='info-producto tags'>

                        <div className={`tag ${seleccionMercado}`}>{seleccionMercado}</div>

                        <div className={`tag ${seleccionPrioridad}`}>{seleccionPrioridad}</div>

                        <div className={`tag basico`}>básico</div>

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

                        <button type="button" className="boton-editar"
                        onClick={ event => {
                            setStatusEditar(true)
                        }}
                        >
                            <FaRegEdit />
                            Editar
                        </button>

                    </div>
                    
                </div>



                
                {
                    statusEditar ?
                    
                    <ProductoEditar 
                        editarProducto={editarProducto}
                        estadoEditar={estadoEditar}
                        item={item}
                        mercados={mercados} selectedMercado={seleccionMercado}
                        prioridad={prioridad} selectedPrioridad={seleccionPrioridad}
                        precio={precio}
                        max={max}
                        units={units}
                    /> 
                        
                    : ""
                }


            </nav>
        </>
    )

}



export default Producto