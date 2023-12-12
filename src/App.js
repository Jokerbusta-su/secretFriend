import React, { useState } from 'react';
import crypto from "crypto-js";



import './App.css';
import CargadorExcel from './CargadorExcel';



const Encabezado = () => (
  <div className="encabezado">
    <h1>Amigo Secreto</h1>
    <p>¡Descubre a quién le regalarás!</p>
  </div>
);




function App() {
  const [participantes, setParticipantes] = useState([]);
  const [archivoCargado, setArchivoCargado] = useState(false);
  const [sorteoRealizado, setSorteoRealizado] = useState(false);

  const handleFileChange = (data) => {
    // data.shift(); // Elimina la primera fila si contiene encabezados

    const participantes = data.map((row) => ({
      nombre: row[0],
      correo: row[1],
      urlImagen: row[2]
    }));

    setParticipantes(participantes);
    setArchivoCargado(true);
    setSorteoRealizado(false); // Resetea el estado del sorteo
  };

  const realizarSorteo = () => {
    let resultado = [];
    let copiaParticipantes = [...participantes]; // Copia de los participantes

    for (let i = 0; i < participantes.length; i++) {
      let indiceAleatorio, amigoSecreto;

      // Si solo queda una persona y es la misma que el participante actual
      if (copiaParticipantes.length === 1 && copiaParticipantes[0].nombre === participantes[i].nombre) {
        // Intercambiar con una asignación anterior
        const intercambio = resultado[0].amigoSecreto;
        resultado[0].amigoSecreto = copiaParticipantes[0].nombre;
        amigoSecreto = { nombre: intercambio };
      } else {
        do {
          indiceAleatorio = Math.floor(Math.random() * copiaParticipantes.length);
          amigoSecreto = copiaParticipantes[indiceAleatorio];
        } while (amigoSecreto.nombre === participantes[i].nombre);

        // Eliminar al amigo secreto elegido de las opciones
        copiaParticipantes.splice(indiceAleatorio, 1);
      }

      resultado.push({ ...participantes[i], amigoSecreto: amigoSecreto.nombre });
    }
    //const webpack = require("webpack");



    for (let xx = 0; xx < resultado.length; xx++) {
      const element = resultado[xx];
      let carlos = crypto.AES.encrypt(JSON.stringify(element), 'my-secret-key@123').toString();
      const encryptedParam = encodeURIComponent(carlos);
      const url = `${window.location.origin}/mostrarResultado?data=${encryptedParam}`;
      console.log(`URL para participante ${element.nombre} : ${url}`);

    }

    setSorteoRealizado(true);
  };

  const iniciarJuego = () => {
    realizarSorteo();
  };

  return (

    <div className="App">
      <Encabezado />
      <CargadorExcel onFileChange={handleFileChange} />
      {archivoCargado && !sorteoRealizado && <button className='boton-iniciar' onClick={iniciarJuego}>Iniciar Juego</button>}
      {sorteoRealizado && <p>Sorteo realizado. Revisa la consola.</p>}
    </div>
  );
}

export default App;
