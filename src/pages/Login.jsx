import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  function fazerLogin(e) {
    e.preventDefault();
    setCarregando(true);

    const body = {
      email: email,
      password: senha,
    };

    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        body
      )
      .then((res) => {
        console.log("Login OK:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/habitos");
      })
      .catch((err) => {
        console.log("Erro no login:", err.response?.data || err.message);
        alert("Login falhou. Verifique o e-mail e a senha.");
        setCarregando(false);
      });
  }

  return (
    <Container>
      <img src={logo} alt="TrackIt" />
      <form onSubmit={fazerLogin}>
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
        <button type="submit" disabled={carregando}>
          {carregando ? "Carregando..." : "Entrar"}
        </button>
      </form>
      <p onClick={() => navigate("/cadastro")}>
        Não tem uma conta? Cadastre-se!
      </p>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  font-family: 'Lexend Deca', sans-serif;
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
    border: 1px solid #ccc;

    &:disabled {
      background-color: #d4d4d4;
      color: #000000;
      -webkit-text-fill-color: #000000; 
      appearance: none; 
    }
  }

  button {
    height: 45px;
    background-color: #52b6ff;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 10px;

    &:disabled {
      background-color: #a0d4ff;
    }
  }

  p {
    color: #52b6ff;
    text-decoration: underline;
    cursor: pointer;
  }
`;


