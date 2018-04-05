import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Title = styled.h1`
font-size: 1.5em;
color: black;
`;

const InvoiceListContainer = styled.div`
  width: 70vw;
  height: auto;
  margin: 0 auto;
`

const Client = (props) => {
  const renderAllInvoices = (invoiceArray) => {
    return invoiceArray.map((invoice, i) => {
      const newTo = { 
        pathname: `${invoice.pathName}`, 
        generalInvoiceData: invoice 
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
  return (
    <InvoiceListContainer>
      <Title>Welcome!</Title>
      <p> Here is a list of all your invoices </p>
      <Table striped bordered condensed hover>
        <tbody>
          <tr>
            <th>#</th>
            <th>Date Created</th>
            <th>Preview</th>
          </tr>
          {renderAllInvoices(props.allInvoices)}
        </tbody>
      </Table>
      <Link to="/"><Button bsSize="small" bsStyle="danger">Sign Out</Button></Link>
    </InvoiceListContainer>
  );
};

export default Client;
