import { createContext, useContext, useState } from "react";

const TemaContext = createContext();

export const useTema = () => {
  return useContext(TemaContext);
};

export const TemaProvider = ({ children }) => {
  const [temaOscuro, setTemaOscuro] = useState(true);

  const toggleTema = () => {
    setTemaOscuro((prevTema) => !prevTema);
  };

  return (
    <TemaContext.Provider value={{ temaOscuro, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
};
