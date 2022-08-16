import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { devices } from '../../utils/devices';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 2px 2px 4px #aaaaaa;
  width: 55%;
  @media ${devices.laptop} {
    width: 70%;
  }
  @media ${devices.tablet} {
    width: 85%;
  }
  @media ${devices.tabletS} {
    width: 90%;
  }
  @media ${devices.mobileL} {
    width: 100%;
    border-radius: 0px;
  }
`;

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
    width: 380px;
  }
  @media ${devices.mobileL} {
    width: 300px;
  }
  @media ${devices.mobileS} {
    width: 180px;
  }
`;

const StyledTitle = styled.h2`
  color: #fd2d01;
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

const HiddenInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const StyledButton = styled.label`
  padding: 15px 60px;
  border: none;
  background-color: #4e5166;
  border-radius: 8px;
  margin: 20px 0px;
  color: #ffffff;
  &:hover {
    box-shadow: 2px 2px 2px #aaaaaa;
    cursor: pointer;
  }
`;

const StyledImg = styled.img`
  width: 90%;
`;

function CreatePost() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);

  async function createPost(data) {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const userFirstName = localStorage.getItem('firstName');
    const userLastName = localStorage.getItem('lastName');
    let current = new Date();
    let years = current.getFullYear();
    let month = current.getMonth() + 1;
    let day = current.getDate();
    let hours = current.getHours();
    let minutes = current.getMinutes();
    const formData = new FormData();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    const date = `${day} ${month} ${years} à ${hours}h${minutes}`;

    formData.append('image', data.file[0]);
    formData.append('postTitle', data.title);
    formData.append('postMessage', data.message);
    formData.append('firstName', userFirstName);
    formData.append('lastName', userLastName);
    formData.append('userId', userId);
    formData.append('postDate', date);

    const request = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Basic ' + token,
      },
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/post/create',
        request
      );
      const status = response.status;
      if (status !== 201) {
        console.log(response);
      } else {
        document.location.href = '/feed';
      }
    } catch (err) {
      console.log(err);
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <StyledDiv>
      <StyledTitle>Nouveau Post</StyledTitle>
      <StyledForm onSubmit={handleSubmit(createPost)}>
        <StyledInput {...register('title')} placeholder="Titre du post" />
        <StyledInput {...register('message')} placeholder="Message du post" />
        <HiddenInput
          {...register('file')}
          type="file"
          id="file"
          onChange={onImageChange}
        />
        <StyledButton for="file">Choissisez un fichier</StyledButton>
        <StyledImg src={image} alt="preview" />
        <StyledSubmit type="submit" />
      </StyledForm>
    </StyledDiv>
  );
}

export default CreatePost;
