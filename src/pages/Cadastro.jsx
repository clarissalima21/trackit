import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

export default function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [carregando, setCarregando] = useState(false);

  function cadastrar(e) {
    e.preventDefault();
    setCarregando(true);

    const body = {
      email: email,
      name: nome,
      image: foto,
      password: senha,
    };

    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        body
      )
      .then(() => {
        navigate("/");
      })
     .catch((erro) => {
  console.log(erro.response?.data || erro.message);
  alert("Erro ao cadastrar! Verifique os dados.");
  setCarregando(false);
});

  }

  return (
    <Container>
      <img src={logo} alt="TrackIt" />
      <form onSubmit={cadastrar}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={carregando}
        />
        <input
          type="password"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={carregando}
        />
        <input
          type="text"
          placeholder="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={carregando}
        />
        <input
          type="text"
          placeholder="foto (URL)"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          disabled={carregando}
        />
        <button type="submit" disabled={carregando}>
          {carregando ? "Carregando..." : "Cadastrar"}
        </button>
      </form>
      <p onClick={() => navigate("/")}>Já tem uma conta? Faça login!</p>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 180px;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 80%;
  }

  input {
    height: 45px;
    margin-bottom: 6px;
    padding: 0 10px;
    font-size: 16px;
  }

  button {
    height: 45px;
    background-color: #52b6ff;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  button:disabled {
    background-color: #a0d4ff;
  }

  p {
    color: #52b6ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;
