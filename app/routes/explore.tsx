import { MetaFunction } from '@remix-run/react'
import React from 'react'

export const meta: MetaFunction = () => {
    return (
        [{
            title: "Expolore"
        }]
    )
}

const Explore = () => {
    return (
        <div>Explore</div>
    )
}

export default Explore