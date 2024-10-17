import { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MultiSelect } from 'primereact/multiselect';


function Filtros(){

    let [mercados,setMercados] = useState([])

    useEffect( () => {
        fetch("http://localhost:4000/mercados")
        .then( res => res.json())
        .then( mercados => {
            setMercados(mercados);
            //console.log(mercados);
        })
    },[]);


    let [textSearchStatus,setTextSearchStatus] = useState(false)

    let [selectStatus,setSelectStatus] = useState(false)
    let [seleccion,setSeleccion] = useState()





    return (
        <>
            <form className='filtros'>

                <div className='busqueda'>

                    <div className={ `filtro-texto ${ textSearchStatus ? "animacion-busqueda-in" : "animacion-busqueda-out"}`}>
                        <FaSearch
                            onClick={ (event) => {
                                setTextSearchStatus(!textSearchStatus);
                                console.log(textSearchStatus);
                            }}
                        />

                        <input type="text" placeholder="Buscar..."
                            className={ textSearchStatus ? "" : "display-none" }
                        />
                    </div>
                    

                    <MultiSelect value={seleccion} className="seleccion"
                        display='chip' placeholder='Mercados' maxSelectedLabels=""
                        options={
                            mercados.map( ({id,mercado}) => {
                                return mercado
                            })
                        }
                        onFocus={() => {
                            console.log("lhckjrh")
                        }}

                        onChange={ event => {
                            setSeleccion(event.value)
                        }}
                    />
                    
                </div>

            </form>
        </>
    )
}


export default Filtros