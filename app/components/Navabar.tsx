
import { Link } from '@remix-run/react'
import React from 'react'

function Navabar() {
    return (
        <div className="Navbar w-full">
            <div className="flex items-center justify-between w-full px-4 py-1">
                <div className="flex justify-between gap-4">
                    <div className="Hero-logo"><img src="logo.png" alt="" className=" max-h-12 " /></div>
                    <div className="flex items-center gap-4">
                        <button className="Nav-btn text-white font-semibold hover:text-gray-200"><span>Home</span></button>
                        {/* <button  className="Nav-btn text-white font-semibold hover:text-gray-200"><span>Courses</span></button>
              <button  className="Nav-btn text-white font-semibold hover:text-gray-200"><span>Instructors</span></button> */}
                        <button className="Nav-btn text-white font-semibold hover:text-gray-200"><span>About</span></button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="Nav-btn text-white font-semibold hover:text-gray-200"><span>Login</span></button>
                </div>
            </div>
        </div>
    )
}

export default Navabar