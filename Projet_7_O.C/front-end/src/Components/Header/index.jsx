import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';
import LogoProfil from '../../assets/logoProfil.svg';
import { devices } from '../../utils/devices';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #fd2d01;
  background-color: #f0f0f0;
`;

const StyledLinkFeed = styled(Link)`
  display: flex;
  align-items: center;
  margin: 15px 50px;
  text-decoration: none;
  color: #fd2d01;
  font-size: 26px;
  transition-duration: 300ms;
  &:hover {
    color: #4e5166;
  }
  @media ${devices.tablet} {
    margin: 15px 30px;
  }
`;

const StyledLogo = styled.img`
  margin-right: 15px;
  @media ${devices.mobileL} {
    width: 65px;
    height: 65px;
  }
`;

const StyledTitle = styled.h1`
  @media ${devices.tablet} {
    display: none;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLinkButton = styled(Link)`
  margin: 0px 30px;
`;

const StyledButton = styled.button`
  font-size: 18px;
  border: none;
  background-color: #fd2d01;
  border-radius: 7px;
  padding: 15px 30px;
  color: #ffffff;
  transition-duration: 300ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 4px #aaaaaa;
  }
  @media ${devices.tablet} {
    font-size: 12px;
    padding: 10px 20px;
  }
`;

function Header() {
  return (
    <NavContainer>
      <StyledLinkFeed to="/feed">
        <StyledLogo src={Logo} alt="Logo" />
        <StyledTitle>Groupomania</StyledTitle>
      </StyledLinkFeed>
      <StyledDiv>
        <Link to="/profil">
          <img height="50" width="50" src={LogoProfil} alt="Icon de profil" />
        </Link>
        <StyledLinkButton to="/new-post">
          <StyledButton>Créer un post</StyledButton>
        </StyledLinkButton>
      </StyledDiv>
    </NavContainer>
  );
}

export default Header;
