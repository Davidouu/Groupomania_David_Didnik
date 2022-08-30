import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const StyledGlobDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px auto;
  align-items: center;
`;

const StyledTitle = styled.h1`
  margin: 40px auto;
  font-size: 20px;
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

function SuppPost() {
  const { id } = useParams();

  function noDelete() {
    document.location.href = `/post/${id}`;
  }

  async function deletePost() {
    const fetchOption = { id: id };
    const token = localStorage.getItem('userToken');

    const request = {
      method: 'DELETE',
      body: JSON.stringify(fetchOption),
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Basic ' + token,
      },
    };

    try {
      const response = await fetch(
        'http://localhost:3001/api/post/deletePost',
        request
      );
      const status = response.status;
      if (status !== 200) {
        console.log(response);
      } else {
        document.location.href = '/feed';
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledGlobDiv>
      <StyledTitle>Voullez vous supprimer votre publication ?</StyledTitle>
      <StyledButton onClick={deletePost}>Oui !</StyledButton>
      <StyledButton onClick={noDelete}>Non !</StyledButton>
    </StyledGlobDiv>
  );
}

export default SuppPost;
