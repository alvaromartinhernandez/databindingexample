import React, {
  useState,
  useEffect /*, createContext, useContext*/,
} from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
