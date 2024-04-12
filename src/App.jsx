import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route exact path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
