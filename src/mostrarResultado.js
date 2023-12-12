import React, { useEffect, useState } from 'react';
import crypto from "crypto-js";
import { useLocation } from 'react-router-dom'; // Asegúrate de tener 'react-router-dom' instalado

const MostrarResultado = () => {
    const [data, setData] = useState(null);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const encryptedData = queryParams.get('data');

        if (encryptedData) {
            const bytes = crypto.AES.decrypt(decodeURIComponent(encryptedData), 'my-secret-key@123');
            const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
            setData(decryptedData);
        }
    }, [location]);

    if (!data) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="App">
            <div className="encabezado">
                <h2>Resultado del Sorteo</h2>
            </div>
            {!data ? <div>Cargando...</div> : (
                <div className="contenido">
                    <p>Nombre: {data.nombre}</p>
                    <p>Correo: {data.correo}</p>
                    {mostrarDetalles && (
                        <>
                            <p>Amigo Secreto: {data.amigoSecreto}</p>
                            <img src={data.urlImagen} alt="Imagen del participante" />
                        </>
                    )}
                    <button onClick={() => setMostrarDetalles(!mostrarDetalles)}>
                        {mostrarDetalles ? 'Ocultar Detalles' : 'Mostrar Detalles'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default MostrarResultado;
