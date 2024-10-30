import { useState, useSyncExternalStore } from "react"

import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { HiOutlineCheckCircle } from "react-icons/hi2";





function MercadosEditar(
    {           
        verMercados,

        mercados,

        addMercado,delMercado,editarMercado
    }
){

/* VARIABLES Y HOOKS */

let [inputAdd,setInputAdd] = useState("")
let [inputEditar,setInputEditar] = useState("")



/* Estado añadir mercado -------------------------------------------- */

let [statusAdd,setStatusAdd] = useState(false)
let [statusInputAdd,setStatusInputAdd] = useState(true)



/* Estado editar mercado --------------------------------------------- */

let [statusEditar,setStatusEditar] = useState(false)
let [editarId,setEditarId] = useState()





/* POPUP ANIMACION */

let [statusPopup,setStatusPopup] = useState(true)







/* ___________________________________________________________________________________________________________________ */





    return (
        <>
             <nav className="nav-blur">


            {/* Tap fuera para salir de la ventana ------------ */}

                <div className="tap-fuera"
            
                    onClick={ event => {
                        setStatusPopup(false)
                        setTimeout( () => { verMercados(false) },250)
                        
                    }}
                ></div>
    
            {/* ----------------------------------------------- */}





                <div className={`resumen pop-up ${ statusPopup ? "" : "pop-out" } `}>


            {/* ------------------- BORRAR ----------------------------------------------------------------------------- */}
                        
                    <div className="seccion-botones top-botones">

                        <IoMdClose className="boton-icono cerrar"
                            onClick={ event => {
                                setStatusPopup(false)
                                setTimeout( () => { verMercados(false) },250)
                            }}
                        />

                    </div>

            {/* ------------------------------------------------------------------------------------------------------------ */}


                    
                    <h2>Mercados</h2>


                        
                    <div className='info-propiedad opciones'>

                        <div className="lista-propiedades">


                    {/* ------- TABLA ---------------------------------------------------------------------------- */}
                            
                            {
                                mercados.map( ({id,mercado}) => {

                                    return (

                                        <div className={`opcion-propiedad ${ statusEditar && id == editarId ? "no-padding editar" : ""}`}>

                                            {
                                                statusEditar && id == editarId ?

                                                    <>
                                                        <input type="text" className="input-propiedad editar" defaultValue={mercado}
                                                            onChange={ event => {
                                                                setInputEditar(event.target.value)
                                                            }}
                                                        ></input>


                                                        <HiOutlineCheckCircle className="boton-icono aceptar"
                                                            onClick={ event => {

                                                                if( inputEditar.trim() == ""){
                                                                    editarMercado({ id : id, mercado : mercado })
                                                                    setStatusEditar(false)


                                        
                                                                }else{

                                                                    setStatusEditar(false)

/* --------------------------------------------------------------- PETICION A LA API --------------------------------------------------------------------------------- */
                                                        /*  ------ EDITAR MERCADO --------------------------------------------------------------------- */
                                                                   
                                                                    fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/mercados/editar",
                                                                        {
                                                                            method : "PUT",
                                                                            body : JSON.stringify({ id : id, mercado : inputEditar }),
                                                                            headers : {
                                                                                "Content-type" : "application/json"
                                                                            }
                                                                        }
                                                                    )
                                                                    .then( res => res.json())
                                                                    .then( res => {
                                                                        editarMercado({ id : id, mercado : inputEditar })
                                                                    })
                                                                }
                                                            }}
                                                        />


                                                        <IoMdClose className="boton-icono cerrar"
                                                            onClick={ event => {
                                                                setStatusEditar(false)
                                                            }}
                                                        />
                                                    </>
                                                

                                                :


                                                <>
                                                    <div className={`tag ${mercado}`} key={id} id={id}
                                                        onClick={ event => {
                                                            setStatusEditar(true)
                                                            setStatusAdd(false)
                                                            setEditarId(id)
                                                        }}
                                                    >{mercado}</div>



                                                    <FaTrash className="boton-icono borrar"
                                                        onClick={ event => {

/* ------------------------------------------------------- PETICION A LA API --------------------------------------------------------------------------- */
                                                    /* --- BORRAR MERCADO --------------------------------------------------------------------- */

                                                            fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/mercados/borrar",
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
                                                                delMercado(id)
                                                            })

                                                        }}
                                                    />
                                                </>
                                            }
                                            
                                            

                                        </div>
                                    )
                                })
                            }

                        </div>





{/* ------------------- AÑADIR PROPIEDAD ----------------------------------------------------------------- */}

                        <div className="add-propiedad">
                            
                            <div className={`opcion-propiedad add ${ statusAdd ? "no-padding" : ""}`}>

                                {
                                    statusAdd ?

                                    <>
                                        <input type="text" className="input-propiedad add"
                                            onChange={ event => {
                                                setInputAdd(event.target.value)
                                            }}
                                        />


                                        <IoIosAddCircle className="boton-icono subir"
                                            onClick={ event => {

                                                if( inputAdd.trim() == "" ){
                                                    event.preventDefault()
                                                    setStatusInputAdd(false)



                                                }else if( inputAdd.trim() != ""){

                                                    setStatusAdd(false)
                                                    setStatusInputAdd(true)

/* ------------------------------------------------ PETICION A LA API ------------------------------------------------------------------------------- */
                                        /* -------- AÑADIR MERCADO ----------------------------------------------------- */

                                                        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/mercados/nuevo",
                                                            {
                                                                method : "POST",
                                                                body : JSON.stringify({ mercado : inputAdd }),
                                                                headers : {
                                                                    "Content-type" : "application/json"
                                                                }
                                                            }
                                                        )
                                                        .then( res => res.json())
                                                        .then( ([{id}]) => {
                                                            addMercado({ id : id, mercado : inputAdd })
                                                        })
                                                        
                                                    }
                                                    
                                                }

                                            }
                                        
                                        />


                                        <IoMdClose className="boton-icono cerrar"
                                            onClick={ event => {
                                                setStatusAdd(false)
                                                setStatusInputAdd(true)
                                            }}
                                        />
                                    </>
                                    
                                    :

                                    <button className="boton-icono add"
                                        onClick={ event => {
                                            setStatusAdd(true)
                                            setStatusEditar(false)
                                        }}
                                    >
                                        <FaPlus/>
                                        Añadir
                                    </button>
                                }
                                
                            </div>

                            <p className="mensaje-error"
                                style={ statusInputAdd ? { display : "none" } : { display : "block" }}
                            >No puede dejarse vacío</p>
                        </div>

                    </div>

                    

            {/* --------------- AVISO ------------------------------------------------------------------- */}


                    <div className="info-propiedad">
                        <p className="mensaje-aviso">Las propiedades modificadas o borradas también se modificarán o borrarán en los productos que contengan dichas propiedades</p>
                    </div>
                    

                </div>


</nav>
        </>
    )

}



export default MercadosEditar