import React from 'react'
import { BrowserRouter as Link } from "react-router-dom";
import '../style/subirImagen.css'

const Navbar = () => {
    return (
        <div>
            <nav class="navbar navbar-dark bg-primary">
                <div class="container">
                    <a class="nav-link" href="/lista"><Link to="/lista"> Imagenes</Link></a>
                    <a class="navbar-brand" href="/"><Link to="/">Cargar</Link></a>
                </div>



            </nav>
        </div>
    )
}

export default Navbar
