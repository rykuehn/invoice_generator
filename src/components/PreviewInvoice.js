import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
font-size: 1.5em;
color: green;
`;

const PreviewInvoice = (props) => {
  console.log(props.location)
  return <Title>Preview Invoice Page</Title>;
};

export default PreviewInvoice;
