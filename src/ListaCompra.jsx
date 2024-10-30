import { useState,useEffect } from "react"

import Toggle from 'react-toggle'
import "react-toggle/style.css"

import { BiSolidFridge } from "react-icons/bi";
import { TbShoppingBagEdit } from "react-icons/tb";



function ListaCompra({id,editarProductoEstado,editarProductosCompra,producto,estado,mercado,precio,prioridad,max}){

/* VARIABLES & HOOKS */

    let [maxCompra,setMaxCompra] = useState([])

    /* max es una variable con valor numérico */
    useEffect( () => {
        setMaxCompra( Array.apply(null,Array(max)).map( (val,i) => {
            return { value : false }
        }))
    },[])
    

    
    let [countCompra,setCountCompra] = useState([])

    useEffect( () => {
        setCountCompra( Array.apply(null,Array(1)).map( (val,i) => {
            return { i : i, value : true }
        }))
    },[])


    /*
    setMaxCompra.map( (maxCompra,index) => {
        countCompra.map( ({value},i) => {
            if( index == i ){
                maxCompra.value = value
            }
        })
        return maxCompra
    })

    countCompra.map( ({value},i) => {
        setMaxCompra( (maxCompra,index) => {
            if( index == i ){
                maxCompra.value = value
            }
            return maxCompra
        })
    }) 
    */

    
    


/* ________________________________________________________________________________________________________________________________________________________________ */





    return (
        <>
            <div className='producto-lista'>
                

                <div className='info-producto producto'>

                    
                    <label className="input-estado">
                        <Toggle
                            defaultChecked={estado}
                            icons={
                                {
                                    checked : <BiSolidFridge />,
                                    unchecked : <TbShoppingBagEdit />
                                }
                            }

                            onChange={ event => {

                        /* ------------------------ PETICION A LA API ---------------------------------------------------------------------------------------*/

                                fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos/editar/estado",
                                    {
                                        method : "PUT",
                                        body : JSON.stringify(
                                            {
                                                id : id,
                                                estado : !estado
                                            }
                                        ),
                                        headers : {
                                            "Content-type" : "application/json"
                                        }
                                    }
                                )
                                .then( res => res.json())
                                .then( res => {
                                    editarProductosCompra({ id : id })
                                })

                            }}
                        />
                    </label>



                    <div className="producto-nombre">
                        <h4>{producto}</h4>
                    </div>
                    



                    <div className="compras">
                        {
                            maxCompra.map( ({value},i) => {
                                return (                                     
                                    <input type="checkbox" className="input-checkbox"
                                        defaultCheckedhecked={ i == 1 ? true : false } 
                                        onChange={ event => {
                                            event.target.checked
                                            //checkedCountCompra(event.target.value)
                                        }}
                                    />

                                )
                            })
                        }
                    </div>
                    


                </div>




                <div className='info-producto tags'>
                    <div className='precio'>{precio}€</div>
                    <div className={`tag ${mercado}`}>{mercado}</div>
                    <div className={`tag ${prioridad}`}>{prioridad}</div>
                </div> 
                
            </div>
        </>
    )

}


export default ListaCompra