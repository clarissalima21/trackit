import styled from "styled-components";
import logo2 from "../assets/logo2.png";

export default function Topo({ foto }) {
  return (
    <Header>
      <img className="logo" src={logo2} alt="TrackIt Logo" />
      <img className="foto" src={foto} alt="user" />
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  .logo {
    height: 40px;
  }

  .foto {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
