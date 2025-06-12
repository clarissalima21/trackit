import styled from "styled-components";
import { useEffect, useState } from "react";
import Topo from "../components/Topo";
import Menu from "../components/Menu";
import axios from "axios";

export default function Habitos() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nomeHabito, setNomeHabito] = useState("");
  const [diasSelecionados, setDiasSelecionados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [habitos, setHabitos] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("user");
    if (dados) {
      const user = JSON.parse(dados);
      setUsuario(user);
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      buscarHabitos();
    }
  }, [usuario]);

  function buscarHabitos() {
    const token = usuario.token;

    axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setHabitos(res.data);
    })
    .catch((err) => {
      console.log("Erro ao buscar hábitos:", err.response?.data || err.message);
      alert("Erro ao carregar hábitos.");
    });
  }

  function toggleDia(index) {
    if (diasSelecionados.includes(index)) {
      setDiasSelecionados(diasSelecionados.filter((dia) => dia !== index));
    } else {
      setDiasSelecionados([...diasSelecionados, index]);
    }
  }

  function salvarHabito(e) {
    e.preventDefault();
    setCarregando(true);
    const token = usuario.token;

    const body = {
      name: nomeHabito,
      days: diasSelecionados,
    };

    axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      setNomeHabito("");
      setDiasSelecionados([]);
      setMostrarFormulario(false);
      setCarregando(false);
      buscarHabitos();
    })
    .catch((err) => {
      console.log("Erro ao criar hábito:", err.response?.data || err.message);
      alert("Erro ao criar hábito.");
      setCarregando(false);
    });
  }

  if (!usuario) return <div>Carregando...</div>;

  return (
    <>
      <Topo foto={usuario.image} />
      <Container>
        <Titulo>
          <h1>Meus hábitos</h1>
          <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            +
          </button>
        </Titulo>

        {mostrarFormulario && (
          <Formulario onSubmit={salvarHabito}>
            <input
              type="text"
              placeholder="nome do hábito"
              value={nomeHabito}
              onChange={(e) => setNomeHabito(e.target.value)}
              disabled={carregando}
            />

            <Dias>
              {["D", "S", "T", "Q", "Q", "S", "S"].map((dia, index) => (
                <Dia
                  key={index}
                  type="button"
                  selecionado={diasSelecionados.includes(index)}
                  onClick={() => toggleDia(index)}
                  disabled={carregando}
                >
                  {dia}
                </Dia>
              ))}
            </Dias>

            <Botoes>
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                disabled={carregando}
              >
                Cancelar
              </button>
              <button type="submit" disabled={carregando}>
                {carregando ? "Salvando..." : "Salvar"}
              </button>
            </Botoes>
          </Formulario>
        )}

        {habitos.length === 0 ? (
          <Mensagem>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </Mensagem>
        ) : (
          habitos.map((h) => (
            <Habito key={h.id}>
              <h3>{h.name}</h3>
              <DiasHabito>
                {["D", "S", "T", "Q", "Q", "S", "S"].map((dia, index) => (
                  <Dia
                    key={index}
                    selecionado={h.days.includes(index)}
                    disabled
                  >
                    {dia}
                  </Dia>
                ))}
              </DiasHabito>
            </Habito>
          ))
        )}
      </Container>
      <Menu ativo="habitos" />
    </>
  );
}

const Container = styled.div`
  padding: 90px 20px 100px 20px;
  font-family: 'Lexend Deca', sans-serif;
  background-color: #F2F2F2;
  min-height: 100vh;
`;

const Titulo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    font-size: 22px;
    color: #126ba5;
  }

  button {
    width: 40px;
    height: 35px;
    font-size: 25px;
    color: white;
    background-color: #52b6ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Formulario = styled.form`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;

  input {
    width: 100%;
    height: 45px;
    margin-bottom: 10px;
    padding: 0 10px;
    font-size: 16px;
    font-family: 'Lexend Deca', sans-serif;

    &:disabled {
      background-color: #f2f2f2;
    }
  }
`;

const Dias = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
`;

const Dia = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.selecionado ? "#CFCFCF" : "#FFFFFF")};
  color: ${(props) => (props.selecionado ? "#FFFFFF" : "#DBDBDB")};
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: ${(props) => (props.selecionado ? "#CFCFCF" : "#FFFFFF")};
    color: ${(props) => (props.selecionado ? "#FFFFFF" : "#DBDBDB")};
    cursor: default;
  }
`;

const Botoes = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    height: 35px;
    padding: 0 15px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;

    &:first-child {
      background-color: transparent;
      color: #52b6ff;
    }

    &:last-child {
      background-color: #52b6ff;
      color: white;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

const Mensagem = styled.p`
  color: #666666;
  font-size: 16px;
  line-height: 22px;
`;

const Habito = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;

  h3 {
    font-size: 16px;
    color: #666666;
    margin-bottom: 10px;
    font-family: 'Lexend Deca', sans-serif;
  }
`;

const DiasHabito = styled.div`
  display: flex;
  gap: 4px;
`;
