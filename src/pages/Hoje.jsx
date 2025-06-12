import styled from "styled-components";
import { useEffect, useState } from "react";
import Topo from "../components/Topo";
import Menu from "../components/Menu";
import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { FaCheck } from "react-icons/fa";

export default function Hoje() {
  const [usuario, setUsuario] = useState(null);
  const [habitosHoje, setHabitosHoje] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("user");
    if (dados) {
      const user = JSON.parse(dados);
      setUsuario(user);
    }
  }, []);

  useEffect(() => {
    if (usuario) {
      buscarHabitosHoje();
    }
  }, [usuario]);

  function buscarHabitosHoje() {
    const token = usuario.token;

    axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      setHabitosHoje(res.data);
    })
    .catch((err) => {
      console.log("Erro ao buscar hábitos de hoje:", err.response?.data || err.message);
      alert("Erro ao carregar hábitos de hoje.");
    });
  }

  function marcarHabito(habito) {
    const token = usuario.token;
    const url = habito.done 
      ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`
      : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`;

    axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      buscarHabitosHoje();
    })
    .catch((err) => {
      console.log("Erro ao atualizar hábito:", err.response?.data || err.message);
      alert("Erro ao atualizar hábito.");
    });
  }

  if (!usuario) return <div>Carregando...</div>;

  const dataHoje = dayjs().locale('pt-br').format('dddd, DD/MM');

  return (
    <>
      <Topo foto={usuario.image} />
      <Container>
        <Data>{dataHoje}</Data>

        {habitosHoje.length === 0 ? (
          <Mensagem>Você não tem hábitos para hoje!</Mensagem>
        ) : (
          habitosHoje.map((h) => (
            <Habito key={h.id}>
              <Info>
                <h3>{h.name}</h3>
                <p>Sequência atual: <span>{h.currentSequence} dias</span></p>
                <p>Seu recorde: <span>{h.highestSequence} dias</span></p>
              </Info>
              <Check 
                feito={h.done}
                onClick={() => marcarHabito(h)}
              >
                <FaCheck />
              </Check>
            </Habito>
          ))
        )}
      </Container>
      <Menu ativo="hoje" />
    </>
  );
}

const Container = styled.div`
  padding: 90px 20px 100px 20px;
  font-family: 'Lexend Deca', sans-serif;
  background-color: #f2f2f2;
  min-height: 100vh;
`;

const Data = styled.h2`
  font-size: 20px;
  color: #126ba5;
  margin-bottom: 15px;
  text-transform: capitalize;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.div`
  h3 {
    font-size: 16px;
    color: #666666;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #666666;
    margin: 2px 0;

    span {
      font-weight: bold;
    }
  }
`;

const Check = styled.button`
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.feito ? "#8FC549" : "#EBEBEB")};
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    color: white; 
    font-size: 32px;
  }
`;



