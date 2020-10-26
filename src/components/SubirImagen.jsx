import React, { useState } from "react"
import { storage, firebase } from '../firebase'
import logo from '../img/uc.png'
import Swal from 'sweetalert2'
import { UploadIcon } from '@primer/octicons-react'
import Navbar from "./Navbar";
import '../style/subirImagen.css'


const SubirImagen = () => {

    const [imagen, setimagen] = useState(null)
    const [url, seturl] = useState("")
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState("")
    const [prueba, setPrueba] = useState("")

    const handChange = e => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file["type"]
            const validarImagen = ["image/gif", "image/jpeg", "image/png"]

            if (validarImagen.includes(fileType)) {
                console.log("holi")
                setError("");
                setimagen(file)
            }
        } else {
            setError("porfii ,elige una imagen a subir")
        }
    }


    const subir = () => {
        if (imagen) {
            const uploadTask = storage.ref(`imagen/${imagen.name}`).put(imagen)
            uploadTask.on(
                "state_changed",
                snapshot => {
                    //el progreso de subida 
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress);
                    console.log("ingreso")
                    console.log("url", url)
                    console.log("imagen", imagen)
                },
                //error al subir
                error => {
                    setError(error);
                },
                () => {
                    //imagen ya arriba
                    storage
                        .ref("imagen")
                        .child(imagen.name)
                        .getDownloadURL()
                        .then(downloadURL => {

                            seturl(downloadURL)
                            setProgress(0)
                            console.log("La url", downloadURL)

                        });

                    Swal.fire({
                        icon: 'success',
                        title: 'Imagen Cargada',
                        text: 'Agrega un pie de pagina y puedes subir tu imagen',

                    })

                });
        }
        else {
            setError("no ha seleccionado imagen ")
        }
    };

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
                foto: url
            }
            const data = await db.collection('ingreso').add(nuevaPublicacion)
            setPrueba('')

            Swal.fire({
                icon: 'success',
                title: 'Documento guardado en imagnes',
            })
        } catch{

        }
    }

    return (

        <div className="contenedorGeneral">
            <Navbar />
            <div className="contenedorCarga">
                <p>  1- Selecciona un archivo y carga la imagen ( < UploadIcon size={24} />) </p>
                <input type="file" onChange={handChange} />{" "}
                <button onClick={subir}><UploadIcon size={24} /></button>
                <div>
                    {progress > 0 ? <progress value={progress} max="100" /> : ""}
                    <p style={{ color: "red" }}>{error}</p>
                </div>
            </div>

            {url ? (
                <img src={url} alt="logo" width="50%" />
            ) : (
                    <img src={logo} alt="logo" width="50%"

                    />
                )}
            <div className="contenedorTexto">
                2- Agregar una descripcion de la imagen y presiona Enviar
                <form onSubmit={agregarTrabajo}>
                    <input type="text" placeholder="descripcion" onChange={e => setPrueba(e.target.value)} value={prueba} />
                    <button> Enviar</button>
                </form>
            </div>

        </div>

    )

}
export default SubirImagen