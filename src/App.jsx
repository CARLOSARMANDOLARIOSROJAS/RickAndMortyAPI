import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { Personaje } from "./components/Personaje";
import { Pagination } from "./components/Pagination";

function App() {
  const [personajes, setPersonajes] = useState([]);
  const [info, setInfo] = useState({});
  const [buscar, setBuscar] = useState("");
  const [resultado, setResultado] = useState("");
  const [mostrarPaginacion, setMostrarPaginacion] = useState(true);


  const url = `https://rickandmortyapi.com/api/character/?name=${buscar}`;

  const obtenerPersonajes = async (url) => {
    try {
      const { data } = await axios.get(url);
      setPersonajes(data.results);
      setInfo(data.info);
      setBuscar(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPersonajes(`https://rickandmortyapi.com/api/character`);
  }, []);

  const searchCharacter = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setResultado(response.data.results);
        console.log(response.data.results);
        setMostrarPaginacion(false);
      });
      setBuscar("");
    }
  };

  const onNext = () => {
    obtenerPersonajes(info.next);
  };

  const onPrevious = () => {
    obtenerPersonajes(info.prev);
  };

  return (
    <div>   
        <Navbar brand="(Rick and Morty App)" />
        <div className="my-4">
          <input
            style={{ width: 270, marginLeft: 110 }}
            type="text"
            className="form-control form-control-lg-4"
            placeholder="Search a character"
            onKeyPress={searchCharacter}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>
        <div className="container mt-2">
          {mostrarPaginacion && 
          <Pagination
            prev={info.prev}
            next={info.next}
            onPrevious={onPrevious}
            onNext={onNext}
          />
          }
          <Personaje character={resultado.length > 0 ? resultado : personajes} />
        </div>
    </div>
  );
}

export default App;
