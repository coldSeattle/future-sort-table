import React from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { getSmallData } from '../../helpers/helpers'
import "./index.scss"

const Home = () => {
    return (
        <div className="home">
            <h1 className="home__title title">Home</h1>
            <div className="home__link-container">
                <Link className="home__link link" to="/small">Small Dates</Link>
                <Link className="home__link link" to="/big">Large Dates</Link>
            </div>
        </div>
    )
}

export { Home }