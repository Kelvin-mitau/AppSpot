
import React from 'react'
import Navabar from '../components/Navbar'

function Layout({ children }: any) {
    return (
        <>
            <Navabar />
            {children}
        </>
    )
}

export default Layout