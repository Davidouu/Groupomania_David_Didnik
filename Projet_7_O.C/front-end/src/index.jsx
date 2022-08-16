import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import Log from './Pages/Log';
import Feed from './Pages/Feed';
import CreatePost from './Pages/CreatePost';
import Profil from './Pages/Profil';
import ModifyPost from './Pages/ModifyPost';
import SuppPost from './Pages/SuppPost';
import OnePost from './Pages/Post';

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    display: flex;
    flex-direction: column;
    background-color: #F0F0F030;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/new-post" element={<CreatePost />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/modifypost/:id" element={<ModifyPost />} />
        <Route path="/suppression/:id" element={<SuppPost />} />
        <Route path="/post/:id" element={<OnePost />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
