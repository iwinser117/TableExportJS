import React, { useState } from "react";
import axios from "axios";
import Tabla from "./Tabla";
import "../css/controls.css";

const Controls = () => {
  const [apiSeleccionada, setApiSeleccionada] = useState(null);
  const [apiUrl, setApiUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [ultimaInteraccion, setUltimaInteraccion] = useState(null);
  const [opcionesApi] = useState([
    {
      nombre: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com/posts",
    },
    {
      nombre: "Rick and Morty",
      url: "https://rickandmortyapi.com/api/character",
    },
    {
      nombre: "fakestoreapi",
      url: "https://fakestoreapi.com/products",
    },
    {
      nombre: "random-user",
      url: "https://random-data-api.com/api/v2/users/",
    },
    // Agrega más opciones según sea necesario
  ]);

  const [apiData, setApiData] = useState(null);

  const manejarClick = async () => {
    const urlToFetch = ultimaInteraccion === "select" ? apiUrl : inputUrl;

    if (!urlToFetch) {
      console.error("Por favor, selecciona o ingresa una URL de API.");
      return;
    }

    try {
      const respuesta = await axios.get(urlToFetch);
      const datosObtenidos =
        respuesta.data.results ||
        (Array.isArray(respuesta.data)
          ? respuesta.data
          : typeof respuesta.data === "object" && respuesta.data !== null
          ? [respuesta.data]
          : []);

      if (datosObtenidos.length > 0) {
        setApiData({ url: urlToFetch, datos: datosObtenidos });
      } else {
        setApiData(null);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setApiData(null);
    }
  };

  return (
    <div className="controls">
      <h2>Selecciona una API:</h2>
      <select
        onChange={(e) => {
          setApiUrl(e.target.value);
          setUltimaInteraccion("select");
        }}
      >
        <option value="">Selecciona una API</option>
        {opcionesApi.map((api, index) => (
          <option key={index} value={api.url}>
            {api.nombre}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Ingresa una URL de API"
        value={inputUrl}
        onChange={(e) => {
          setInputUrl(e.target.value);
          setUltimaInteraccion("input");
        }}
      />

      <button className="boton centerbtn" onClick={manejarClick}>Obtener Datos</button>

      {apiData && (
        <div>
          <h3>Datos de la API seleccionada:</h3>
          <div className="data-info">
            <p>API URL:</p>
            <p>{apiData.url}</p>
            <p>{apiData.datos.length}</p>
          </div>
          {apiData.datos.length > 0 ? (
            <Tabla datos={apiData.datos} />
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Controls;
