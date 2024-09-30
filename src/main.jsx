import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Error from './Error.jsx'
import Gasto from './Gasto.jsx'
import Producto from './Producto.jsx'
import Productos from './Productos.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    errorElement : <Error />
  },
  {
    path : "/gasto-total",
    element : <Gasto />
  },
  {
    path : "/productos",
    element : <Productos />,
    children : [
      {
        path : "/productos/nuevo",
        element : <Producto />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
