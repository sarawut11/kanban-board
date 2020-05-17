import React from 'react';
import {Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';
import Board from '../Board';
import './style.css'
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-x: auto;
    color: rgb(46, 68, 78);
    background-color: cadetblue;
    min-height: 100vh;
  }
  a:-webkit-any-link {
    text-decoration: none;
    text-decoration-color: none;
    color: rgb(46, 68, 78);
  }
  :focus {
    outline: none;
  }
`;

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Route exact path="/" component={Board} />
  </React.Fragment>
);

export default App;
