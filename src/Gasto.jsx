import { useState } from 'react'
import Header from './Header.jsx'
import Menu from './Menu.jsx'

function Gasto() {

    return (
        <>
            <Header title="Gasto total mensual"/>
            <Menu page="gasto"/>
            
        </>
    )
}

export default Gasto