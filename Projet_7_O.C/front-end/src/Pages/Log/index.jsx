import { useState } from 'react';
import SignIn from '../../Components/Signin';
import SignUp from '../../Components/Signup';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';
import { devices } from '../../utils/devices';

const StyledButtonClicked = styled.button`
  padding: 15px 60px;
  border: none;
  background-color: #ffd7d7;
  border-radius: 8px;
  box-shadow: 2px 2px 2px #aaaaaa;
  margin: 0px 30px 30px 30px;
  color: #ffffff;
`;

const StyledLogo = styled.img`
  width: 80px;
  height: 85px;
`;

const StyledButton = styled.button`
  padding: 15px 60px;
  border: none;
  background-color: #4e5166;
  border-radius: 8px;
  margin: 0px 30px 30px 30px;
  color: #ffffff;
  &:hover {
    background-color: #ffd7d7;
    box-shadow: 2px 2px 2px #aaaaaa;
  }
`;

const StyledDiv = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivButton = styled.div`
  display: flex;
  align-items: center;
  @media ${devices.tabletS} {
    flex-direction: column;
  }
`;

const StyledDivLogo = styled.div`
  display: flex;
  margin-bottom: 2em;
`;

const StyledTitle = styled.h1`
  color: #fd2d01;
  font-size: 38px;
  margin-left: 1em;
  @media ${devices.mobileL} {
    margin-left: 0.25em;
  }
`;

function Log() {
  const [signIn, setSignIn] = useState(true);

  return signIn ? (
    <StyledDiv>
      <StyledDivLogo>
        <StyledLogo src={Logo} alt="logo" />
        <StyledTitle>Groupomania</StyledTitle>
      </StyledDivLogo>
      <StyledDivButton>
        <StyledButtonClicked onClick={() => setSignIn(true)}>
          Connexion
        </StyledButtonClicked>
        <StyledButton onClick={() => setSignIn(false)}>
          Inscription
        </StyledButton>
      </StyledDivButton>
      <SignIn />
    </StyledDiv>
  ) : (
    <StyledDiv>
      <StyledDivLogo>
        <StyledLogo src={Logo} alt="logo" />
        <StyledTitle>Groupomania</StyledTitle>
      </StyledDivLogo>
      <StyledDivButton>
        <StyledButton onClick={() => setSignIn(true)}>Connexion</StyledButton>
        <StyledButtonClicked onClick={() => setSignIn(false)}>
          Inscription
        </StyledButtonClicked>
      </StyledDivButton>
      <SignUp />
    </StyledDiv>
  );
}

export default Log;
