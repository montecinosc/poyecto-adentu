import React, { useState } from 'react'
import { firebase } from '../firebase'
import { FileDirectoryFillIcon, DesktopDownloadIcon } from '@primer/octicons-react'
import Navbar from './Navbar';
import '../style/subirImagen.css'

const Listar = () => {

    const [informacion, setInformacion] = useState([])

    const leerDatos = async () => {

        try {
            const db = firebase.firestore()
            const data = await db.collection('ingreso').get()
            console.log(data.docs)
            const arrayDatos = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(arrayDatos)
            setInformacion(arrayDatos)
        }
        catch  {
            console.log("error")
        }
    }

    return (
        <div>
            <Navbar />
          Haz click para ver los documentos cargados
            <button onClick={leerDatos}>    <FileDirectoryFillIcon size={30} /> </button>

            <div className="contenedorTarjetas">
                {
                    informacion.map(item => (
                        <div key={item.id}>
                            <div className="card" width=" 18rem">
                                <img src={item.foto} className="card-img-top" width="250px" />
                                <div className="card-body">
                                    <h4>Descripcion :</h4>
                                    <p className="card-text">  {item.descripcion}</p>
                                    <h4>Ubicacion:</h4>
                                    <p>{item.latitud}</p>
                                    <p>{item.longitud}</p>

                                </div>
                                <a href={item.foto} download> <button> <DesktopDownloadIcon size={24} />Descargar Imagen</button></a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}

export default Listar
