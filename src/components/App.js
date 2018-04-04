import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
font-size: 1.5em;
color: red;
`;

const App = () => {
  return (
    <div>
      <Title>HomePage / Sign in</Title>
      <Link to="/admin"><button>Admin Account</button></Link>
      <Link to="/client"><button>Client Account</button></Link>
    </div>
  );
};

export default App;
