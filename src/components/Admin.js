import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';

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
      const newTo = { 
        pathname: `${invoice.pathName}`, 
        param1: "Par1" 
      };
      return(
        <tr key={i}>
          <th>{i}</th>
          <th>{invoice.dateCreated}</th>
          <th><Link to={newTo}>{invoice.pathName}</Link></th>
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
        <Link to="/invoiceCreator"><Button bsSize="small" style={{marginRight: '20px'}}>Generate New Invoice</Button></Link>
        <Link to="/"><Button bsSize="small" bsStyle="danger">Sign Out</Button></Link>
      </InvoiceListContainer>
    );
  }
};

export default Admin;
