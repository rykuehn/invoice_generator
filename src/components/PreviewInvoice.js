import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
font-size: 1.5em;
color: green;
`;

const PreviewInvoice = (props) => {
  return <Title>Preview Invoice Page {props.match.params.invoiceNumber}</Title>;
};

export default PreviewInvoice;
