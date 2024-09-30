import { useState } from "react"

function Producto(){

    let [inputItem,setInputItem] = useState("");

    return (
        <>
            <section className="producto-nuevo">
                <h2 
                    className={ inputItem == "" ? "item-vacio" : "nombre-item" }
                >
                    { inputItem == "" ? "Nuevo producto" : inputItem }
                </h2>
                
                <form className="producto-nuevo-form">
                    
                    <input type="text" placeholder="Producto" className="input-item"
                        onChange={ event => {
                            setInputItem(event.target.value)
                        }}
                    />

                    <div className="input-precio">
                        <input type="text" placeholder="Precio" className="input-precio"/>€
                    </div>
                    

                    <div className="seccion-botones">
                        <button className="boton-form cancelar">Cancelar</button>
                        <input className="boton-form submit" type="submit" value="Añadir"/>
                    </div>


                </form>
            </section>

            

        </>
    )

}


export default Producto