import { useState,useEffect } from "react";
import './Filtros.css'

import { MultiSelect } from 'primereact/multiselect';

import { FaSearch } from "react-icons/fa";



function Filtros(
    {
        buscarItem,
        filtrarMercado,
        mercados,tipos,prioridadLista
    }
){

/* VARIABLES & HOOKS */

/* Estados */

    let [textSearchStatus,setTextSearchStatus] = useState(false)



/* Animación */

    let [statusAnimacionTexto,setStatusAnimacionTexto] = useState(false)





/* Funciones */

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [seleccionTipos,setSeleccionTipos] = useState()
    let [seleccionPrioridad,setSeleccionPrioridad] = useState()





/* ______________________________________________________________________________________________________________________________________ */





    return (
        <>
            <div className="barra-busqueda">
               <div className='contenedor-filtros'>



{/* ----------- BUSQUEDA ---------------------------------------------------------------------------------------------------------------------------------------- */}

                    <div className='filtros'>

                        <div className={ `filtro-texto `}>
                            
                            <FaSearch
                                onClick={ (event) => {
                                    setStatusAnimacionTexto(!statusAnimacionTexto)
                                    if( !statusAnimacionTexto ){
                                        setTextSearchStatus(!textSearchStatus)
                                    }else{
                                        setTimeout( () => { setTextSearchStatus(!textSearchStatus) },550)
                                    }
                                    
                                    
                                    
                                }}
                            />

                            
                            {
                                textSearchStatus ? 
                                
                                <input type="text" className={ statusAnimacionTexto ? "animacion-busqueda-in" : "animacion-busqueda-out" }
                                placeholder="Buscar..."
                                    onChange={ event => {
                                        buscarItem(event.target.value)
                                        console.log(event.target.value)
                                    }}
                                />

                                : ""
                            }
                            

                        </div>




                        
    {/* --------------- MERCADOS ------------------------------------------------------------------------------------------------------------------------------------ */}

                        <MultiSelect className="filtro-seleccion"
                            display='chip' placeholder='Mercados' maxSelectedLabels=""

                            value={seleccionMercado} 
                            
                            options={
                                mercados.map( ({mercado,id}) => { return mercado })
                            }
                            
                            onFocus={() => {
                            }}

                            onChange={ event => {
                                setSeleccionMercado(event.value)
                                console.log(seleccionMercado)
                            }}
                        />





    {/* --------------- TIPO ----------------------------------------------------------------------------------------------------------------------------------------- */}

                        <MultiSelect className="filtro-seleccion"
                            display="chip" placeholder="Tipos" maxSelectedLabels=""

                            value={seleccionTipos}

                            options={
                                tipos.map( ({tipo,id}) => { return tipo })
                            }

                            onChange={ event => {
                                setSeleccionTipos(event.value)
                            }}
                        />





    {/* ---------------- PRIORIDAD ---------------------------------------------------------------------------------------------------------------------------------------- */}

                        <MultiSelect className="filtro-seleccion"
                            display="chip" placeholder="Prioridad" maxSelectedLabels=""

                            value={seleccionPrioridad}

                            options={
                                prioridadLista.map( ({prioridad,id}) => { return prioridad })
                            }

                            onChange={ event => {
                                setSeleccionPrioridad(event.value)
                            }}
                        />


                    </div>

                </div> 
            </div>
            
        </>
    )
}


export default Filtros