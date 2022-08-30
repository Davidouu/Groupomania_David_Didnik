import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { devices } from '../../utils/devices';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  margin: 15px 0px;
  padding: 5px auto;
  border: 1px solid #ababab;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  width: 500px;
  @media ${devices.tabletS} {
    width: 400px;
  }
  @media ${devices.mobileL} {
    width: 340px;
  }
  @media ${devices.mobileS} {
    width: 270px;
  }
`;

const StyledSubmit = styled.input`
  margin: 15px 0px;
  padding: 15px 0px;
  width: 40%;
  text-align: center;
  border: none;
  background-color: #fd2d01;
  border-radius: 8px;
  color: #ffffff;
  &:hover {
    box-shadow: 2px 2px 4px #aaaaaa;
  }
`;

function SignIn() {
  const { register, handleSubmit } = useForm();

  async function SignInUser({ email, password }) {
    let dataUser = {
      email: email,
      password: password,
    };

    const request = {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/login',
        request
      );
      const responseUser = await response.json();
      const status = response.status;
      if (status !== 200) {
        console.log(responseUser);
        alert(responseUser);
      } else {
        console.log(responseUser);
        const userFirstName = responseUser.firstName;
        const userLastName = responseUser.lastName;
        const userIdStorage = responseUser.userId;
        const userTokenStorage = responseUser.token;
        const userAdmin = responseUser.isAdmin;
        localStorage.setItem('isAdmin', userAdmin);
        localStorage.setItem('userId', userIdStorage);
        localStorage.setItem('userToken', userTokenStorage);
        localStorage.setItem('firstName', userFirstName);
        localStorage.setItem('lastName', userLastName);
        document.location.href = '/feed';
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(SignInUser)}>
      <StyledInput {...register('email')} placeholder="Email" />
      <StyledInput {...register('password')} placeholder="Mot de passe" />
      <StyledSubmit type="submit" />
    </StyledForm>
  );
}

export default SignIn;
