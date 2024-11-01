import { useState,useEffect } from 'react'

import Header from './Header.jsx'
import Menu from './Menu.jsx'
import FiltrosGastos from './FiltrosGastos.jsx'
import CompraNueva from './CompraNueva.jsx'
import './Productos.css'

import { FaPlus } from "react-icons/fa6";






function Gasto(){

/* VARIABLES & HOOKS */

/* Gastos --------------------------------------------------------------------------------------- */

    let [compras,setCompras] = useState([])





/* Productos ------------------------------------------------------------------------------------ */

    let [productos,setProductos] = useState([])

    useEffect( () => {
        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/productos/info")
        .then( res => res.json() )
        .then( productos => {
            setProductos(productos)
        })
    },[])



/* Mercados ----------------------------------------------------------------------------------------- */

    let [mercados,setMercados] = useState([])
        
    useEffect( () => {
        fetch("https://ceidwfs24-esa-proyecto-final-back.onrender.com/mercados")
        .then( res => res.json())
        .then( mercados => {
            setMercados(mercados)
        })
    },[])





/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */




/* Estado ventana Nuevo gasto */

    let [compraNueva,setCompraNueva] = useState(false)
        
    function crearCompra(status){
        setCompraNueva(status)
    }





/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

/*  FUNCIONES */

/* PRODUCTOS ----------------------------------------------------------------------------------------------------------------------------------------- */

    function addCompra(compra){
        setCompras([...compras,compra])
    }





/* ___________________________________________________________________________________________________________________________________________________________________________________________________________ */



    

    return (
        <>
            <Header title="Gasto total mensual"/>
            <Menu page="gasto"/>





{/* ------------ GASTO NUEVO ------------------------------------------------------ */}

{
                    compraNueva ? 
                    <CompraNueva
                        crearCompra={crearCompra}

                        addCompra={addCompra}

                        productos={productos}
                        mercados={mercados}
                    /> 
                    : ""
                }




            
            <nav className="lista-compra gasto-total">


                <div className='barra-tareas'>

                    {/* Componente Filtro */}

                    <FiltrosGastos
                        mercados={mercados}
                    />
                



                    {/* Icono añadir producto */}

                    <FaPlus className='icono-add'
                        onClick={ event => {
                            crearCompra(true)
                        }}
                    />

                </div>


                <section className='contenedor-productos'>
                        {
                            compras.length < 1 ? "No ha habido ningún gasto" : ""
                        }
                </section>


            </nav>
            
        </>
    )
}

export default Gasto