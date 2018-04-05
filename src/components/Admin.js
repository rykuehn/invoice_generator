import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

const Title = styled.h1`
font-size: 40px;
color: black;
font-family: Helvetica;
margin-bottom: 40px;
`;

const InvoiceListContainer = styled.div`
  width: 70vw;
  height: auto;
  margin: 0 auto;
`

class Admin extends Component {
  constructor(props){
    super(props);
  }

  renderAllInvoices(invoiceArray) {
    return invoiceArray.map((invoice, i) => {
      return(
        <tr key={i}>
          <th>{i}</th>
          <th>{invoice.dateCreated}</th>
          <th><Link to={`/${invoice.pathName}`}>{invoice.pathName}</Link></th>
      </tr>
      );
    });
  };

  render(){
    return (
      <InvoiceListContainer>
        <Title>Welcome Administator!</Title>
        <p> Here is a list of all the invoices you have created </p>
        <Table striped bordered condensed hover>
          <tbody>
            <tr>
              <th>#</th>
              <th>Date Created</th>
              <th>Preview</th>
            </tr>
            {this.renderAllInvoices(this.props.allInvoices)}
          </tbody>
        </Table>
        <Link to="/invoiceCreator"><button>Generate New Invoice</button></Link>
      </InvoiceListContainer>
    );
  }
};

export default Admin;
