import { useState } from 'react'

function Header({title}) {

    return (
        <>
            <header>
                <h1 className='title'>{title}</h1>
            </header>
        </>
    )
}

export default Header