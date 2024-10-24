import { useState, useSyncExternalStore } from "react"

import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { HiOutlineCheckCircle } from "react-icons/hi2";





function PrioridadEditar(
    {           
        verPrioridad,

        prioridadLista,

        addPrioridad,delPrioridad,editarPrioridad,
    }
){

/* VARIABLES Y HOOKS */

let [inputAdd,setInputAdd] = useState("")
let [inputEditar,setInputEditar] = useState("")


/* Estado añadir prioridad --------------------------------------- */
let [statusAdd,setStatusAdd] = useState(false)
let [statusInputAdd,setStatusInputAdd] = useState(true)


/* Estado editar prioridad */
let [statusEditar,setStatusEditar] = useState(false)
let [editarId,setEditarId] = useState()







/* ___________________________________________________________________________________________________________________ */





    return (
        <>
             <nav className="nav-blur">


            {/* Tap fuera para salir de la ventana ------------ */}

                <div className="tap-fuera"
            
                    onClick={ event => {
                                verPrioridad(false)
                            }}
                ></div>
    
            {/* ----------------------------------------------- */}





                <div className="resumen pop-up">


            {/* ------------------- BORRAR ----------------------------------------------------------------------------- */}
                        
                    <div className="seccion-botones top-botones">

                        <IoMdClose className="boton-icono cerrar"
                            onClick={ event => {
                                verPrioridad(false)
                            }}
                        />

                    </div>

            {/* ------------------------------------------------------------------------------------------------------------ */}


                    
                    <h2>prioridad</h2>


                        
                    <div className='info-propiedad opciones'>

                        <div className="lista-propiedades">


                    {/* ------- prioridad ---------------------------------------------------------------------------- */}
                            
                            {
                                prioridadLista.map( ({id,prioridad}) => {

                                    return (

                                        <div className={`opcion-propiedad ${ statusEditar && id == editarId ? "no-padding editar" : ""}`}>

                                            {
                                                statusEditar && id == editarId ?

                                                    <>
                                                        <input type="text" className="input-propiedad editar" defaultValue={prioridad}
                                                            onChange={ event => {
                                                                setInputEditar(event.target.value)
                                                            }}
                                                        ></input>


                                                        <HiOutlineCheckCircle className="boton-icono aceptar"
                                                            onClick={ event => {

                                                                if( inputEditar.trim() == ""){
                                                                    editarPrioridad({ id : id, prioridad : prioridad })
                                                                    setStatusEditar(false)


                                        
                                                                }else{

                                                                    setStatusEditar(false)

/* --------------------------------------------------------------- PETICION A LA API --------------------------------------------------------------------------------- */
                                                        /*  ------ EDITAR PRIORIDAD --------------------------------------------------------------------- */
                                                                   
                                                                    fetch("http://localhost:4000/prioridad/editar",
                                                                        {
                                                                            method : "PUT",
                                                                            body : JSON.stringify({ id : id, prioridad : inputEditar }),
                                                                            headers : {
                                                                                "Content-type" : "application/json"
                                                                            }
                                                                        }
                                                                    )
                                                                    .then( res => res.json())
                                                                    .then( res => {
                                                                        editarPrioridad({ id : id, prioridad : inputEditar })
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
                                                    <div className={`tag ${prioridad}`} key={id} id={id}
                                                        onClick={ event => {
                                                            setStatusEditar(true)
                                                            setStatusAdd(false)
                                                            setEditarId(id)
                                                        }}
                                                    >{prioridad}</div>



                                                    <FaTrash className="boton-icono borrar"
                                                        onClick={ event => {

/* ------------------------------------------------------- PETICION A LA API --------------------------------------------------------------------------- */
                                                    /* --- BORRAR PRIORIDAD --------------------------------------------------------------------- */

                                                            fetch("http://localhost:4000/prioridad/borrar",
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
                                                                delPrioridad(id)
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
                                        /* -------- AÑADIR PRIORIDAD ----------------------------------------------------- */

                                                        fetch("http://localhost:4000/prioridad/nueva",
                                                            {
                                                                method : "POST",
                                                                body : JSON.stringify({ prioridad : inputAdd }),
                                                                headers : {
                                                                    "Content-type" : "application/json"
                                                                }
                                                            }
                                                        )
                                                        .then( res => res.json())
                                                        .then( ([{id}]) => {
                                                            addPrioridad({ id : id, prioridad : inputAdd })
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



export default PrioridadEditar