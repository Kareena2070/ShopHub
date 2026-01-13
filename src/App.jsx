import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Cart from './pages/Cart'
import { Routes, Route } from "react-router-dom"
import ProductDetails from "./pages/ProductDetails"

function App() {

  return (
    <>
      <Navbar/>

      <Routes> 
        <Route path="/" element={<Home/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </>
  )
}

export default App
