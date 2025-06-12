import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function Menu({ ativo }) {
  const navigate = useNavigate();

  return (
    <Rodape>
      <Metade 
        ativo={ativo === "habitos"}
        onClick={() => navigate("/habitos")}
      >
        <FaCalendarAlt />
        <span>Hábitos</span>
      </Metade>
      <Metade 
        ativo={ativo === "hoje"}
        onClick={() => navigate("/hoje")}
      >
        <FaCalendarAlt />
        <span>Hoje</span>
      </Metade>
    </Rodape>
  );
}

const Rodape = styled.footer`
  width: 100%;
  height: 70px;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  font-family: 'Lexend Deca', sans-serif;
`;

const Metade = styled.div`
  width: 50%;
  background-color: ${(props) => (props.ativo ? "#52b6ff" : "#ffffff")};
  color: ${(props) => (props.ativo ? "#ffffff" : "#d4d4d4")};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;
