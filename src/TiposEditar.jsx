import { useState, useSyncExternalStore } from "react"

import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { HiOutlineCheckCircle } from "react-icons/hi2";





function TiposEditar(
    {           
        verTipos,

        tipos,

        addTipo,delTipo,editarTipo
    }
){

/* VARIABLES Y HOOKS */

let [inputAdd,setInputAdd] = useState("")
let [inputEditar,setInputEditar] = useState("")


/* Estado añadir tipo --------------------------------------- */
let [statusAdd,setStatusAdd] = useState(false)
let [statusInputAdd,setStatusInputAdd] = useState(true)


/* Estado editar tipo */
let [statusEditar,setStatusEditar] = useState(false)
let [editarId,setEditarId] = useState()







/* ___________________________________________________________________________________________________________________ */





    return (
        <>
             <nav className="nav-blur">


            {/* Tap fuera para salir de la ventana ------------ */}

                <div className="tap-fuera"
            
                    onClick={ event => {
                                verTipos(false)
                            }}
                ></div>
    
            {/* ----------------------------------------------- */}





                <div className="resumen pop-up">


            {/* ------------------- BORRAR ----------------------------------------------------------------------------- */}
                        
                    <div className="seccion-botones top-botones">

                        <IoMdClose className="boton-icono cerrar"
                            onClick={ event => {
                                verTipos(false)
                            }}
                        />

                    </div>

            {/* ------------------------------------------------------------------------------------------------------------ */}


                    
                    <h2>Tipos</h2>


                        
                    <div className='info-propiedad opciones'>

                        <div className="lista-propiedades">


                    {/* ------- TABLA ---------------------------------------------------------------------------- */}
                            
                            {
                                tipos.map( ({id,tipo}) => {

                                    return (

                                        <div className={`opcion-propiedad ${ statusEditar && id == editarId ? "no-padding editar" : ""}`}>

                                            {
                                                statusEditar && id == editarId ?

                                                    <>
                                                        <input type="text" className="input-propiedad editar" defaultValue={tipo}
                                                            onChange={ event => {
                                                                setInputEditar(event.target.value)
                                                            }}
                                                        ></input>


                                                        <HiOutlineCheckCircle className="boton-icono aceptar"
                                                            onClick={ event => {

                                                                if( inputEditar.trim() == ""){
                                                                    editarTipo({ id : id, tipo : tipo })
                                                                    setStatusEditar(false)


                                        
                                                                }else{

                                                                    setStatusEditar(false)

/* --------------------------------------------------------------- PETICION A LA API --------------------------------------------------------------------------------- */
                                                        /*  ------ EDITAR TIPO --------------------------------------------------------------------- */

                                                                    fetch("http://localhost:4000/tipos/editar",
                                                                        {
                                                                            method : "PUT",
                                                                            body : JSON.stringify({ id : id, tipo : inputEditar }),
                                                                            headers : {
                                                                                "Content-type" : "application/json"
                                                                            }
                                                                        }
                                                                    )
                                                                    .then( res => res.json())
                                                                    .then( res => {
                                                                        editarTipo({ id : id, tipo : inputEditar })
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
                                                    <div className={`tag ${tipo}`} key={id} id={id}
                                                        onClick={ event => {
                                                            setStatusEditar(true)
                                                            setStatusAdd(false)
                                                            setEditarId(id)
                                                        }}
                                                    >{tipo}</div>



                                                    <FaTrash className="boton-icono borrar"
                                                        onClick={ event => {

/* ------------------------------------------------------- PETICION A LA API --------------------------------------------------------------------------- */
                                                    /* --- BORRAR TIPO --------------------------------------------------------------------- */

                                                            fetch("http://localhost:4000/tipos/borrar",
                                                                {
                                                                    method : "DELETE",
                                                                    body : JSON.stringify({ id : id }),
                                                                    headers : {
                                                                        "Content-type" : "application/json"
                                                                    }
                                                                }
                                                            )
                                                            .then( res => res.json())
                                                            .then( (ok) => {
                                                                delTipo(id)
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
                                        /* -------- AÑADIR TIPO ----------------------------------------------------- */

                                                        fetch("http://localhost:4000/tipos/nuevo",
                                                            {
                                                                method : "POST",
                                                                body : JSON.stringify({ tipo : inputAdd }),
                                                                headers : {
                                                                    "Content-type" : "application/json"
                                                                }
                                                            }
                                                        )
                                                        .then( res => res.json())
                                                        .then( ([{id}]) =>{
                                                            addTipo({ id : id, tipo : inputAdd })
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



export default TiposEditar