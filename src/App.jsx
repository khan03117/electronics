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
import About from './pages/about'
import Testimonial from './pages/Testimonial'
import Polcy from './Layout/Polcy'
import Wishlist from './pages/Shop/Wishlist'

function App() {

  const ThemeRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<WebLayout />} >
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/testimonials' element={<Testimonial />} />
          <Route path='/single-product/:id' element={<SingleProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
          <Route path='/shop/category/:url?/:suburl?/:burl?' element={<Shop />} />
          <Route path='/shop/brand/:burl' element={<Shop />} />

          <Route path='/policy/:url' element={<Polcy />} />
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
