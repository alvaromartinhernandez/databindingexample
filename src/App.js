import React, {
  useState,
  useEffect /*, createContext, useContext*/,
} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [id, setId] = useState("");

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const addnewelement = (e) => {
    e.preventDefault();

    console.log("voy a mandar id:" + id + ", nombre:" + nombre);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, nombre: nombre }),
    };
    fetch("http://localhost:3000/peliculas", requestOptions)
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
  };

  useEffect(() => {
    fetch("http://localhost:3000/peliculas")
      .then((response) => response.json())
      .then((peliculas) => {
        console.log(peliculas);
        setPeliculas(peliculas); // ⬅️ Guardar datos
        setIsLoading(false); // ⬅️ Desactivar modo "cargando"
      });
  }, []);

  if (isLoading) {
    // ⬅️ si está cargando, mostramos un texto que lo indique
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <input
        onChange={handleNombreChange}
        type="text"
        name="nombre"
        id="nombre"
        placeholder="nombre"
        value={nombre}
      />
      <input
        onChange={handleIdChange}
        type="text"
        name="id"
        id="id"
        placeholder="id"
        value={id}
      />
      <button type="button" name="add" onClick={addnewelement}>
        ADD
      </button>
      {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
      <table>
        <tbody>
          {peliculas?.map((pelicula) => {
            return (
              <tr key={pelicula.id}>
                <td>{pelicula.nombre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
