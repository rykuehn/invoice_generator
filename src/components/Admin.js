import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { InvoiceCreator } from './InvoiceCreator';

const Title = styled.h1`
font-size: 1.5em;
color: blue;
`;

class Admin extends Component {
  constructor(props){
    super(props);
  }

  render(){

    return (
      <div>
        <Title>Admin Landing Page</Title>
        <ul>
        </ul>
        <Link to="/invoiceCreator"><button>Generate new Invoice</button></Link>
      </div>
    );
  }
};

export default Admin;
