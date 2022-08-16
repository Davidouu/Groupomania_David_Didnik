import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { devices } from '../../utils/devices';

const StyledGbDiv = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 2px 2px 4px #aaaaaa;
  width: 60%;
  margin: 100px auto;
  border-radius: 10px;
  @media ${devices.laptopL} {
    width: 70%;
  }
  @media ${devices.laptop} {
    width: 80%;
  }
  @media ${devices.tablet} {
    width: 90%;
  }
  @media ${devices.tabletS} {
    width: 100%;
    border-radius: 0px;
  }
`;

const StyledHeaderPost = styled.div`
  display: flex;
  border-bottom: 2px solid #ffd7d7;
  width: 100%;
  justify-content: space-between;
`;

const StyledHeaderPostInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 20px;
  @media ${devices.mobileL} {
    margin: 4px 8px;
  }
`;

const StyledNameAndDate = styled.p`
  margin: 10px 0px;
  @media ${devices.mobileL} {
    margin: 3px 0px;
  }
`;

const StyledContentPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
`;

const StyledTitlePost = styled.h2`
  @media ${devices.mobileL} {
    font-size: 18px;
  }
`;

const StyledMessagePost = styled.h2`
  font-size: 20px;
  @media ${devices.mobileL} {
    font-size: 14px;
  }
`;

const StyledImg = styled.img`
  width: 90%;
`;

function Post() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    async function FetchInfosPost() {
      try {
        const response = await fetch('http://localhost:3000/api/post', {
          headers: {
            Authorization: 'Basic ' + token,
          },
        });
        const responseUser = await response.json();
        setData(responseUser);
      } catch (err) {
        console.log(err);
      }
    }
    FetchInfosPost();
  }, []);

  return (
    <div>
      {data &&
        data.map((data) => (
          <StyledGbDiv to={`/post/${data._id}`}>
            <StyledHeaderPost>
              <StyledHeaderPostInfos>
                <StyledNameAndDate key={data._id + data.firstName}>
                  {data.postFirstName} {data.postLastName}
                </StyledNameAndDate>
                <StyledNameAndDate key={data._id + data.postDate}>
                  {data.postDate}
                </StyledNameAndDate>
              </StyledHeaderPostInfos>
            </StyledHeaderPost>
            <StyledContentPost>
              <StyledTitlePost key={data._id + data.postTitle}>
                {data.postTitle}
              </StyledTitlePost>
              <StyledMessagePost key={data._id + data.postMessage}>
                {data.postMessage}
              </StyledMessagePost>
              {data.imageUrl ? (
                <StyledImg src={data.imageUrl} alt="post" />
              ) : (
                ''
              )}
            </StyledContentPost>
          </StyledGbDiv>
        ))}
    </div>
  );
}

export default Post;
