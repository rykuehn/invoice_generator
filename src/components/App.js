import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';

import Admin from './Admin';
import Client from './Client';
import InvoiceCreator from './InvoiceCreator';
import PreviewInvoice from './PreviewInvoice';

const Title = styled.h1`
font-size: 1.5em;
color: red;
`;

const LandingPage = () => {
  return (
    <div>
    <Title>HomePage / Sign in</Title>
    <Link to="/admin"><button>Admin Account</button></Link>
    <Link to="/client"><button>Client Account</button></Link>
  </div>
  )
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      invoiceLinks:[],
    }
  }

  saveInvoiceLink(pathName) {
    this.setState({ invoiceLinks: [...this.state.invoiceLinks, pathName] });
  }

  render() {
    return (
      <Router>
        <div>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/admin" component={Admin} />
            <Route path="/client" component={Client} />
            <Route path="/invoiceCreator" 
                    render={(props) => <InvoiceCreator {...props} saveInvoiceLink={this.saveInvoiceLink.bind(this)} /> } 
            />
            <Route path="/admin/:invoiceNumber" component={PreviewInvoice} />
        </div>
      </Router>
    );
  }
};

export default App;
