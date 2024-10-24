import { useState } from "react"

function ListaCompra({id,producto,mercado,precio,maxCompra,prioridad}){

    return (
        <>
            <div className='producto-lista'>
                
                <div className='info-producto'>
                    <h4>{producto}</h4>
                    <form className='estado-compra'>
                        {
                            maxCompra.map( (x,i) => {
                                return (
                                    <input key={i} type="checkbox"/>
                                )
                            })
                        }
                    </form>
                </div>

                <div className='info-producto'>
                    <div className='precio'>{precio}€</div>
                    <div className='tag mercado'>{mercado}</div>
                    <div className="tag prioridad">{prioridad}</div>
                </div>
                
            </div>
        </>
    )

}


export default ListaCompra