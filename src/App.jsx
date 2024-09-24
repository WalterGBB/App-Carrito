import { Navigate, Route, Routes } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { Compras } from './pages/Compras'
import { Carrito } from './pages/Carrito'
import { ProductosProvider } from './context/ProductosProvider'
import { CarritoProvider } from './context/CarritoProvider'

export const App = () => {
  return (
    // El que engloba se encuentra disponible para todos los componentes que contiene
    //ProductosProvider está disponible para CarritoProvider pero CarritoProvider no está disponible para ProductosProvider
    <ProductosProvider>
      <CarritoProvider>
        <NavBar></NavBar>
        <div className="container">
          <Routes>
            <Route path='/' element={<Compras></Compras>}></Route>
            <Route path='/carrito' element={<Carrito></Carrito>}></Route>
            <Route path='/*' element={<Navigate to={'/'} />}></Route>
          </Routes>
        </div>
      </CarritoProvider>
    </ProductosProvider>
  )
}
