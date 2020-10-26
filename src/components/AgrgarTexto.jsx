import React, { useState } from 'react'
import shortid from 'shortid'
import { firebase } from '../firebase'
/*
const AgrgarTexto = () => {

    const [prueba, setPrueba] = useState("")
    const [proyectos, setProyectos] = useState([]);

    const agregarTrabajo = async (e) => {
        console.log("agregando a firebase")
        e.preventDefault()
        if (!prueba.trim()) {
            console.log("elemento vacio ")
            return

        }
        try {
            const db = firebase.firestore()
            const nuevaPublicacion = {
                descripcion: prueba,
                imagen: null

            }
            const data = await db.collection('ingreso').add(nuevaPublicacion)
            setPrueba('')
        } catch{

        }
    }
    return (
        <div>
            <p>------------------------------------------------------------------------------------</p>
            <form onSubmit={agregarTrabajo}>
                <input type="text" placeholder="descripcion" onChange={e => setPrueba(e.target.value)} />
                <input type="text" placeholder="direccion" />
                <input type="file" />
                <button> Enviar</button>
            </form>
            <div>
                lista...
                {
                    proyectos.map(item => {
                        <li key={item.id}>
                            <span> {item.prueba}</span>
                        </li>

                    })
                }
            </div>
            <p>------------------------------------------------------------------------</p>
        </div>
    )
}

export default AgrgarTexto
*/