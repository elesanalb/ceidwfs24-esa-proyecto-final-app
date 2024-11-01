import { useState,useEffect } from "react";
import './Filtros.css'

import { MultiSelect } from 'primereact/multiselect';

import { FaSearch } from "react-icons/fa";



function FiltrosGastos(
    {
        mercados
    }
){

/* VARIABLES & HOOKS */

/* Estados */

    let [textSearchStatus,setTextSearchStatus] = useState(false)



/* Animación */

    let [statusAnimacionTexto,setStatusAnimacionTexto] = useState(false)





/* Funciones */

    let [seleccionMercado,setSeleccionMercado] = useState()
    let [seleccionFecha,setSeleccionFecha] = useState()





/* ______________________________________________________________________________________________________________________________________ */





    return (
        <>
            <section className="contenedor-filtros">
                <div className='filtros'>


    {/* ------------ BUSQUEDA ---------------------------------------------------------------------------------------------------------------------------------------- */}

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
                                }}
                            />

                            : ""
                        }
                        

                    </div>



    {/* --------------- TIPO ----------------------------------------------------------------------------------------------------------------------------------------- */}

                    <MultiSelect className="filtro-seleccion"
                        display="chip" placeholder="Fecha" maxSelectedLabels=""

                        value={seleccionFecha}

                        options={["Enero 2024","Febrero 2024"]}

                        onChange={ event => {
                            setSeleccionFecha(event.value)

                        }}
                    />




                    
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
                        }}
                    />


                </div> 
            </section>
                        
        </>
    )
}


export default FiltrosGastos