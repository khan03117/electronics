import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import WebLayout from './Layout/WebLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import SingleProduct from './pages/Shop/SingleProduct'
import Checkout from './pages/Shop/Checkout'
import Cart from './pages/Shop/Cart'
import Contact from './pages/contact'
import Orders from './pages/Shop/Orders'
import Login from './pages/auth/Login'

function App() {

  const ThemeRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<WebLayout />} >
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/single-product/:id' element={<SingleProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </>
    )
  )
  return (
    <>
      <RouterProvider router={ThemeRoute} />
    </>

  )
}

export default App
