import React, { Component } from "react";
import { useState } from "react";



function CustomDropDown({inputCantidad,optionsLista}){

  let [activeElementType,setActiveElementType] = useState("dropdown")

  function dropDownChanged(e) {
    if (e.target.value === "custom") {
      setActiveElementType("input")
    }
  }

  function DropDownComp(options){
    return (
      <select onChange={e => dropDownChanged(e)}>

        <option value="0" disabled selected></option>
        
        {
          options.map( ({value}) => {
            return (
              <option value={value}>{value}</option>
            )
          })
        }
        
      </select>
    );
  }


  function InputFieldComp(inputCantidad){
    return <input 
      onChange={ event => {
        inputCantidad(event.target.value)
      }}
    />;
  }

  
    return (
      <div>
        {
          activeElementType === "dropdown" ? 
          <DropDownComp options={optionsLista} />
          : 
          <InputFieldComp inputCantidad={inputCantidad} />
        }
      </div>
    )

}


export default CustomDropDown;