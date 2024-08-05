import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Outlet } from 'react-router-dom'
import { CartProvider } from '../CartContext'

const WebLayout = () => {
    return (
        <>
            <CartProvider>


                <Header />
                <main>
                    {<Outlet />}
                </main>
                <Footer />
            </CartProvider>
        </>
    )
}

export default WebLayout