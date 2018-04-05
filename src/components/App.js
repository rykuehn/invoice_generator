import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import Admin from './Admin';
import Client from './Client';
import InvoiceCreator from './InvoiceCreator';
import PreviewInvoice from './PreviewInvoice';
import Welcome from './Welcome';

const Title = styled.h1`
font-size: 1.5em;
color: red;
`;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      allInvoices:[{dateCreated: '2018.04.04', pathName: 'client'}, {dateCreated: '2018.22.04', pathName: 'secondOne'}],
      clients: {},
      clientIDCount: 0,
    }
  }

  saveInvoiceLink(clientID, data) {
    //saves object of information from the form to a specific clientID. This information will be used to render a preview of the template for both the client and the admin
    if(this.state.clients.clientID){
      var updatedclientInvoices = [...this.state.clients.clientID.invoices, data];
      this.setState({ allInvoices: [...this.state.allInvoices, data], clients: updatedclientInvoices });
    } else {

      var newClientID = this.state.clientIDCount;
      var newClientInfo = {};
      newClientInfo[newClientID] = [data];
      var clientInfo = Object.assign({}, this.state.clients, newClientInfo);
      
      this.setState({ allInvoices: [...this.state.allInvoices, data], clients: clientInfo });
    }
  }

  render() {
    return (
      <Router>
        <div>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/admin" 
              render={(props) => <Admin {...props} allInvoices={this.state.allInvoices} /> }
            />
            <Route path="/client" component={Client} />
            <Route path="/invoiceCreator" 
              render={(props) => <InvoiceCreator {...props} saveInvoiceLink={this.saveInvoiceLink.bind(this)} /> } 
            />
            <Route path="/invoice/:invoiceNumber" component={PreviewInvoice} />
        </div>
      </Router>
    );
  }
};

export default App;
