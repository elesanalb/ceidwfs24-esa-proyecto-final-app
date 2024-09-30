import { useState } from 'react'
import { Link } from 'react-router-dom'

function Error() {

  return (
    <>
        <h1>Error 404 - No existe esta página</h1>
        <div>Quizás te interese <Link to="/">volver a la página inicial</Link></div>
    </>
  )
}

export default Error
