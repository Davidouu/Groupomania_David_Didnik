import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { devices } from '../../utils/devices';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const StyledGlobDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledComment = styled.button`
  border: none;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 20px auto;
  transition-duration: 300ms;
  &:hover {
    background-color: #4e516660;
  }
`;

const StyledDial = styled.div`
  border: 2px solid #ffd7d7;
  border-radius: 10px;
  margin: 15px auto;
  background-color: #f0f0f040;
  width: 100%;
  @media ${devices.tabletS} {
    width: 90%;
  }
  @media ${devices.mobileM} {*
  width: 85%;
}
`;

const StyledDialName = styled.h2`
  font-size: 15px;
  padding: 0;
  margin: 10px;
`;

const StyledDialMessage = styled.p`
  font-size: 14px;
  padding: 0;
  margin: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  margin: 15px 0px;
  padding: 15px;
  border: 2px solid #4e5166;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  width: 400px;
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

const StyledSubmit = styled.input`
  padding: 10px 20px;
  margin: 0px;
  border: 2px solid #4e5166;
  border-radius: 5px;
  background-color: #ffffff;
  transition-duration: 300ms;
  &:hover {
    box-shadow: 2px 2px 4px #aaaaaa;
  }
`;

function Comment() {
  const { register, handleSubmit } = useForm();
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentData, setCommentData] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    async function FetchComments() {
      setIsCommentLoading(false);
      try {
        const response = await fetch(
          `http://localhost:3000/api/post//all/comments`,
          {
            headers: {
              Authorization: 'Basic ' + token,
            },
          }
        );
        const responseUser = await response.json();
        const filtered = responseUser.filter((obj) => {
          return obj.postId === id;
        });
        setCommentData(filtered);
        console.log(filtered);
      } catch (err) {
        console.log(err);
      } finally {
        setIsCommentLoading(true);
      }
    }
    FetchComments();
  }, []);

  async function submitComment(data) {
    const userId = localStorage.getItem('userId');
    const userFirstName = localStorage.getItem('firstName');
    const userLastName = localStorage.getItem('lastName');

    const dataPost = {
      message: data.message,
      id: id,
      userId: userId,
      firstName: userFirstName,
      lastName: userLastName,
    };

    const request = {
      method: 'POST',
      body: JSON.stringify(dataPost),
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Basic ' + token,
      },
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/post/comment',
        request
      );
      const status = response.status;
      if (status !== 201) {
        console.log(response);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (!isCommentLoading) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div>
        <StyledComment>Commentaires</StyledComment>
        {commentData &&
          commentData.map((commentData) => (
            <StyledGlobDiv>
              <StyledDial>
                <StyledDialName>
                  {commentData.commentFirstName} {commentData.commentLastName}
                </StyledDialName>
                <StyledDialMessage>{commentData.message}</StyledDialMessage>
              </StyledDial>
            </StyledGlobDiv>
          ))}
        <StyledForm onSubmit={handleSubmit(submitComment)}>
          <StyledInput
            {...register('message')}
            placeholder="Nouveau Commentaire"
          />
          <StyledSubmit type="submit" />
        </StyledForm>
      </div>
    );
  }
}

export default Comment;
