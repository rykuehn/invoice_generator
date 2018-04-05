import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height:100vh;
  width:100vw;
`;

const Container = styled.div`
  margin-top: 10%;
`;

const LoginButtons = styled.div`
  maxWidth: 254px;
  margin: 0 auto 10px;
`;

const Welcome = () => {
  return (
    <PageWrapper>
      <Container>
          <img src="../../assets/abe_icon.png" />
          <LoginButtons>
          <Link to="/admin"><Button bsStyle="primary" block style={{margin:'5px'}}>Admin Account</Button></Link>
          <Link to="/client"><Button block style={{margin:'5px'}}>Client Account</Button></Link>
        </LoginButtons>
      </Container>
    </PageWrapper>
  )
}

export default Welcome;