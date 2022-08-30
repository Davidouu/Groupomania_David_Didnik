import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iconMenu from '../../assets/iconMenu.png';
import { devices } from '../../utils/devices';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import CommentDial from '../Comments';
import '../../utils/css/index.css';

const StyledGbDiv = styled.div`
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

const StyledHeaderPostInfosRight = styled.div`
  display: flex;
  margin: 0px 20px;
  gap: 2em;
  align-items: center;
  position: relative;
`;

const StyledNameAndDate = styled.p`
  margin: 10px 0px;
  @media ${devices.mobileL} {
    margin: 3px 0px;
  }
`;

const StyledNavCo = styled.img`
  padding: 0px;
  cursor: pointer;
  @media ${devices.mobileL} {
    width: 40px;
    height: 40px;
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

const StyledNav = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  border-radius: 10px;
  padding: 10px 20px;
  margin: 0px;
  align-items: center;
  font-size: 18px;
  @media ${devices.tablet} {
    position: absolute;
    top: 70px;
    right: 0px;
    background-color: #aaaaaa90;
  }
`;

const StyledLinkNav = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: #4e5166;
  }
`;

const StyledModifyNav = styled.li`
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #4e5166;
  }
`;

const StyledImg = styled.img`
  width: 90%;
`;

function Post() {
  const [isNav, setIsNav] = useState(true);
  const [data, setData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('isAdmin');
  const [isDataLoading, setDataLoading] = useState(false);

  async function likePost() {
    const token = localStorage.getItem('userToken');
    const bodyLike = {
      like: isLiked,
      id: id,
      userId: userId,
    };
    const requestLike = {
      method: 'POST',
      body: JSON.stringify(bodyLike),
      headers: {
        'content-Type': 'application/json',
        Authorization: 'Basic ' + token,
      },
    };
    try {
      const responseLike = await fetch(
        'http://localhost:3001/api/post/like',
        requestLike
      );
      const responseLikeJson = await responseLike.json();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function FetchInfosPost() {
      setDataLoading(false);
      const token = localStorage.getItem('userToken');
      try {
        const response = await fetch(`http://localhost:3001/api/post/${id}`, {
          headers: {
            Authorization: 'Basic ' + token,
          },
        });
        const responseUser = await response.json();
        const postIsLiked = responseUser.usersLiked.includes(userId);
        setIsLiked(postIsLiked);
        setData(responseUser);
      } catch (err) {
        console.log(err);
      } finally {
        setDataLoading(true);
      }
    }
    FetchInfosPost();
  }, []);

  if (!isDataLoading) {
    return <StyledGbDiv>Chargement...</StyledGbDiv>;
  } else {
    return isNav ? (
      <div>
        <StyledGbDiv>
          <StyledHeaderPost>
            <StyledHeaderPostInfos>
              <StyledNameAndDate>
                {data.postFirstName} {data.postLastName}
              </StyledNameAndDate>
              <StyledNameAndDate>{data.postDate}</StyledNameAndDate>
            </StyledHeaderPostInfos>
            {userId === data.postUserId || isAdmin === true ? (
              <StyledHeaderPostInfosRight>
                <StyledNavCo
                  onClick={() => setIsNav(false)}
                  height="50"
                  width="50"
                  src={iconMenu}
                  alt="Icon de profil"
                />
              </StyledHeaderPostInfosRight>
            ) : (
              ''
            )}
          </StyledHeaderPost>
          <StyledContentPost>
            <StyledTitlePost>{data.postTitle}</StyledTitlePost>
            <StyledMessagePost>{data.postMessage}</StyledMessagePost>
            {data.imageUrl ? <StyledImg src={data.imageUrl} alt="post" /> : ''}
          </StyledContentPost>
          {isLiked === false ? (
            <div id="onIcon" onClick={likePost} class="heartNb">
              <IconContext.Provider
                value={{ className: 'iconHeart', size: '2em' }}
              >
                <AiOutlineHeart />
              </IconContext.Provider>
              <p>{data.likes}</p>
            </div>
          ) : (
            <div onClick={likePost} class="heartNb">
              <IconContext.Provider
                value={{ className: 'iconHeart', color: 'red', size: '2em' }}
              >
                <AiOutlineHeart />
              </IconContext.Provider>
              <p>{data.likes}</p>
            </div>
          )}
          <CommentDial />
        </StyledGbDiv>
      </div>
    ) : (
      <div>
        <StyledGbDiv>
          <StyledHeaderPost>
            <StyledHeaderPostInfos>
              <StyledNameAndDate>
                {data.postFirstName} {data.postLastName}
              </StyledNameAndDate>
              <StyledNameAndDate>{data.postDate}</StyledNameAndDate>
            </StyledHeaderPostInfos>
            {userId === data.postUserId || isAdmin === true ? (
              <StyledHeaderPostInfosRight>
                <StyledNavCo
                  onClick={() => setIsNav(true)}
                  height="50"
                  width="50"
                  src={iconMenu}
                  alt="Icon de profil"
                />
                <StyledNav>
                  <StyledModifyNav>
                    <StyledLinkNav to={`/modifypost/${data._id}`}>
                      Modifier le post
                    </StyledLinkNav>
                  </StyledModifyNav>
                  <StyledLinkNav to={`/suppression/${data._id}`}>
                    Supprimer
                  </StyledLinkNav>
                </StyledNav>
              </StyledHeaderPostInfosRight>
            ) : (
              ''
            )}
          </StyledHeaderPost>
          <StyledContentPost>
            <StyledTitlePost>{data.postTitle}</StyledTitlePost>
            <StyledMessagePost>{data.postMessage}</StyledMessagePost>
            {data.imageUrl ? <StyledImg src={data.imageUrl} alt="post" /> : ''}
          </StyledContentPost>
          {isLiked === false ? (
            <div id="onIcon" onClick={likePost} class="heartNb">
              <IconContext.Provider
                value={{ className: 'iconHeart', size: '2em' }}
              >
                <AiOutlineHeart />
              </IconContext.Provider>
              <p>{data.likes}</p>
            </div>
          ) : (
            <div onClick={likePost} class="heartNb">
              <IconContext.Provider
                value={{ className: 'iconHeart', color: 'red', size: '2em' }}
              >
                <AiOutlineHeart />
              </IconContext.Provider>
              <p>{data.likes}</p>
            </div>
          )}
          <CommentDial />
        </StyledGbDiv>
      </div>
    );
  }
}

export default Post;
