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
      allInvoices:[],
      clients: {},
      clientIDCount: 0,
      invoiceCounter: 0,
    }
  }

  componentWillMount() {
    var allInvoices = localStorage.getItem('allInvoices');
    if (allInvoices === null) {
      this.setState({allInvoices: []});
    } else{
      this.setState({allInvoices})
    }
  }

  componentWillUnMount() {
    localStorage.setItem('allInvoices', this.state.allInvoices, 'invoiceCounter', invoiceCounter);
  }

  saveInvoiceLink(pathName, data) {
    //saves object of information from the form to a specific clientID. This information will be used to render a preview of the template for both the client and the admin
     // if(this.state.clients.clientID){
    //   var updatedclientInvoices = [...this.state.clients.clientID.invoices, data];
    //   this.setState({ allInvoices: [...this.state.allInvoices, data], clients: updatedclientInvoices });
    // } else {

    //   var newClientID = this.state.clientIDCount;
    //   var newClientInfo = {};
    //   newClientInfo[newClientID] = [data];
    //   var clientInfo = Object.assign({}, this.state.clients, newClientInfo);
      
    //   this.setState({ allInvoices: [...this.state.allInvoices, data], clients: clientInfo });
    // }

    var dateCreated = Math.round(new Date().getTime()/1000);
    var savedInvoice = { pathName, dateCreated, data };
    var invoiceCounter = this.state.invoiceCounter + 1;
    this.setState({ allInvoices: [...this.state.allInvoices, savedInvoice], invoiceCounter});
  }

  render() {
    return (
      <Router>
        <div>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/admin" 
              render={(props) => <Admin {...props} allInvoices={this.state.allInvoices} /> }
            />
            <Route path="/client" 
              render={(props) => <Client {...props} allInvoices={this.state.allInvoices} /> }
            />
            <Route path="/invoiceCreator" 
              render={(props) => <InvoiceCreator {...props} saveInvoiceLink={this.saveInvoiceLink.bind(this)} invoiceCounter={this.state.invoiceCounter}/> } 
            />
            <Route path="/invoice" component={PreviewInvoice} />
        </div>
      </Router>
    );
  }
};

export default App;
