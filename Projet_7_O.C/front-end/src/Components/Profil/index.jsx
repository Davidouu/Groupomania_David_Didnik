import styled from 'styled-components';
import LogoProfil from '../../assets/logoProfil.svg';
import { devices } from '../../utils/devices';

const StyledGlobDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px auto;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px #aaaaaa;
  border-radius: 10px;
  width: 60%;
  @media ${devices.tablet} {
    width: 70%;
  }
  @media ${devices.tabletS} {
    width: 85%;
  }
  @media ${devices.mobileL} {
    width: 100%;
    border: none;
    border-radius: 0px;
  }
`;

const StyledDivTitleLogo = styled.div`
  display: flex;
  margin: 20px 0px;
  justify-content: center;
`;

const StyledTitle = styled.h2`
  color: #fd2d01;
  margin-left: 15px;
`;

const StyledList = styled.li`
  list-style: none;
  border: 2px solid #ffd7d7;
  border-radius: 10px;
  margin: 25px 0px;
  padding: 10px 80px;
  width: 90%;
  text-align: center;
  font-size: 20px;
  @media ${devices.tablet} {
    width: 200px;
  }
  @media ${devices.tabletS} {
    width: 185px;
  }
`;

const StyledDivFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
`;

const StyledButton = styled.button`
  padding: 15px 60px;
  border: none;
  background-color: #4e5166;
  border-radius: 8px;
  margin: 0px 30px 30px 30px;
  color: #ffffff;
  &:hover {
    box-shadow: 2px 2px 2px #aaaaaa;
  }
`;

function disconnect() {
  localStorage.clear();
  document.location.href = '/';
}

function Profil() {
  let userFirstName = localStorage.getItem('firstName');
  let userLastName = localStorage.getItem('lastName');

  return (
    <StyledGlobDiv>
      <StyledDivTitleLogo>
        <img src={LogoProfil} alt="Logo" height="65" width="65" />
        <StyledTitle>Mon profil</StyledTitle>
      </StyledDivTitleLogo>
      <StyledDivFlex>
        <StyledUl>
          <StyledList>{userFirstName}</StyledList>
          <StyledList>{userLastName}</StyledList>
        </StyledUl>
        <StyledButton onClick={disconnect}>Déconnexion</StyledButton>
      </StyledDivFlex>
    </StyledGlobDiv>
  );
}

export default Profil;
