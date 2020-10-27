import React, { useState } from "react"
import { storage, firebase } from '../firebase'
import { UploadIcon } from '@primer/octicons-react'
import logo from '../img/uc.png'
import Swal from 'sweetalert2'
import Navbar from "./Navbar";
import '../style/subirImagen.css'


const SubirImagen = () => {

    const [imagen, setimagen] = useState(null)
    const [url, seturl] = useState("")
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState("")
    const [prueba, setPrueba] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [latitudDos, setLatitudDos] = useState("")
    const [longitudDos, setLongitudDos] = useState("")

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
    //subir imagen a storage
    const subirImagen = () => {
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
                    //Alerta de imagen cargada
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
    //subir informacion a base de datos(imagen,lat/long y texto)
    const subirInformacion = async (e) => {
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
                foto: url,
                latitud: latitudDos,
                longitud: longitudDos

            }
            const data = await db.collection('ingreso').add(nuevaPublicacion)
            setPrueba('')

            Swal.fire({
                icon: 'success',
                title: 'Documento guardado en imagenes',
            })
        } catch{

        }
    }
    //buscar latitud y longitud
    const buscarLocalizacion = () => {
        // Verificar si soporta geolocalizacion
        if (navigator.geolocation) {
            console.log("Tu navegador soporta Geolocalizacion")
        } else {
            console.log("Tu navegador no soporta Geolocalizacion");
        }

        //Obtenemos latitud y longitud
        function localizacion(posicion) {
            let latitud = posicion.coords.latitude;
            let longitud = posicion.coords.longitude;
            setLatitudDos("latitud: " + latitud)
            setLongitudDos("longitud:" + longitud)
            setImgUrl(" https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13305.71727119176!2d" + longitud + "!3d" + latitud + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2scl!4v1603749253622!5m2!1ses-419!2scl")

            console.log(imgUrl)
            console.log("latitud", latitud)
            console.log("longitud", longitud)
            console.log("DOOOOOS", latitudDos)
            console.log("longi", longitudDos)
        }
        function error() {
            console.log("no se puede mostrar")
        }
        navigator.geolocation.getCurrentPosition(localizacion, error);
    }

    return (
        <div className="contenedorGeneral">

            <Navbar />

            <div className="contenedorCarga">
                <h5>   1- Selecciona un archivo y carga la imagen ( < UploadIcon size={24} />) </h5>
                <input type="file" onChange={handChange} />{" "}
                <button onClick={subirImagen}><UploadIcon size={24} />Cargar</button>
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

            <div className="contenedorLocalizacion">
                <h5>2- Permite localizar tu ubicacion </h5>
                <button onClick={buscarLocalizacion}>Obtener latitud/longitud</button>
                <iframe src={imgUrl}></iframe>
            </div>

            <div className="contenedorTexto">
                <h5> 3- Agregar una descripcion de la imagen y presiona Enviar </h5>
                <form onSubmit={subirInformacion}>
                    <input type="text" placeholder="descripcion" onChange={e => setPrueba(e.target.value)} value={prueba} />
                    <button> Enviar</button>
                </form>
            </div>

        </div>

    )

}
export default SubirImagen