import { Link, useNavigate } from '@remix-run/react'
import { useEffect, useState } from 'react'

function Navbar() {
    const [userID, setUserID] = useState<null | undefined | string>(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (typeof window !== "undefined") {
            setUserID(localStorage.getItem("userID") || sessionStorage.getItem("userID"))
        }
    }, [])

    return (
        <div className="Navbar w-full">
            <div className="flex items-center justify-between w-full px-4 py-1">

                <button onClick={() => { navigate("/explore") }}>
                    <div className="Hero-logo"><img src="/logo.png" alt="" className=" max-h-12 " /></div>
                </button>

                <div className="flex items-center gap-4">

                    <button className="Nav-btn text-white font-semibold hover:text-gray-200" onClick={() => { navigate("/help") }}><span>Help</span></button>
                    <button className="Nav-btn text-white font-semibold hover:text-gray-200" onClick={() => { navigate("/about") }}><span>About</span></button>
                    {!userID ?
                        <button className="Nav-btn text-white font-semibold hover:text-gray-200" onClick={() => { navigate("/sign-in") }}><span>Login</span></button>
                        : <button className="Nav-btn text-white font-semibold hover:text-gray-200" onClick={() => { navigate(`/profile/${userID}`) }}><span>Profile</span></button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar