import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Habitos from "./pages/Habitos";
import Hoje from "./pages/Hoje"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/habitos" element={<Habitos />} />
        <Route path="/hoje" element={<Hoje />} /> {/* nova rota */}
      </Routes>
    </BrowserRouter>
  );
}
