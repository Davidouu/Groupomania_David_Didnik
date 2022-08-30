import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { devices } from '../../utils/devices';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';

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

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataResponseError, setDataResponseError] = useState(null);
  console.log(dataResponseError);

  async function SignUpUser({ firstName, lastName, email, password }) {
    let dataUser = {
      firstName: firstName,
      lastName: lastName,
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
        'http://localhost:3001/api/auth/signup',
        request
      );
      const responseUser = await response.json();
      const status = response.status;
      if (status !== 201) {
        console.log(responseUser);
        setDataResponseError(responseUser);
      } else {
        console.log(responseUser);
        const secondRequest = {
          method: 'POST',
          body: JSON.stringify(dataUser),
          headers: {
            'content-Type': 'application/json',
          },
        };
        const secondResponse = await fetch(
          'http://localhost:3001/api/auth/login',
          secondRequest
        );
        const secondResponseUser = await secondResponse.json();
        const secondStatus = secondResponse.status;
        if (secondStatus !== 200) {
          console.log(secondResponseUser);
        } else {
          const userIdStorage = secondResponseUser.userId;
          const userTokenStorage = secondResponseUser.token;
          const userFirstName = secondResponseUser.firstName;
          const userLastName = secondResponseUser.lastName;
          const userAdmin = responseUser.isAdmin;
          localStorage.setItem('isAdmin', userAdmin);
          localStorage.setItem('userId', userIdStorage);
          localStorage.setItem('userToken', userTokenStorage);
          localStorage.setItem('firstName', userFirstName);
          localStorage.setItem('lastName', userLastName);
          document.location.href = '/feed';
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit(SignUpUser)}>
      <StyledInput
        {...register('firstName', {
          pattern: {
            value: /[A-Za-z]/,
            message: 'Le prénom ne doit contenir que des lettres',
          },
        })}
        placeholder="Prénom"
      />
      <ErrorMessage errors={errors} name="firstName" />
      <StyledInput
        {...register('lastName', {
          pattern: {
            value: /[A-Za-z]/,
            message: 'Le nom ne doit contenir que des lettres',
          },
        })}
        placeholder="Nom"
      />
      <ErrorMessage errors={errors} name="lastName" />
      <StyledInput
        {...register('email', {
          pattern: {
            value: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
            message: "Désolé l'email n'est pas correcte",
          },
        })}
        placeholder="Email"
        name="email"
      />
      <ErrorMessage errors={errors} name="email" />
      <StyledInput
        {...register('password')}
        placeholder="Mot de passe"
        type="password"
      />
      <StyledSubmit type="submit" />
    </StyledForm>
  );
}

export default SignUp;
