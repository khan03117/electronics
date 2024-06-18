import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import WebLayout from './Layout/WebLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import SingleProduct from './pages/Shop/SingleProduct'

function App() {

  const ThemeRoute = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<WebLayout />} >
          <Route index element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/single-product' element={<SingleProduct />} />
          <Route path='/checkout' element={<SingleProduct />} />
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
