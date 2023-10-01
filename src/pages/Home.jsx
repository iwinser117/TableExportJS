import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "../css/index.css";
import { useTema } from "../utils/TemaContext";
import Controls from "../components/Controls";

const Home = () => {
  const { toggleTema, temaOscuro } = useTema();

  return (
    <div className={`controls ${temaOscuro ? "dark home" : "light home"}`}>
      <button onClick={toggleTema} className="tema-button">
        {temaOscuro ? <FaSun /> : <FaMoon />}
      </button>
      <a
        href="https://iwinser.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="img-logo"
          src="https://user-images.githubusercontent.com/77251836/209884092-ec32bcf0-3e05-4633-972d-2f13afba4de6.svg"
          width={"60px"}
          alt=""
        />
      </a>

      <Controls />
    </div>
  );
};

export default Home;
