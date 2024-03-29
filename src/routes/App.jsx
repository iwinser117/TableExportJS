import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
