import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { PreviewInvoice } from './PreviewInvoice';

const Title = styled.h1`
font-size: 1.5em;
color: blue;
`;

class InvoiceCreator extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, 'from invoice creator')
    this.state = {
      policies: '',
      show: false,
      invoiceCounter: 0,
    }
  }

  componentDidMount() {
    axios.get('/data/policies.json')
          .then((response) => {
            const policies = response.data;
            this.setState({ policies, show: true })
          })
          .catch(function (error) {
            console.log(error);
          });

  }

  saveInvoice() {
    this.props.saveInvoiceLink ('hello');
    this.setState({invoiceCounter: this.state.invoiceCounter + 1 });
  }

  render(){
      return (
        <div>
          <Title>InvoiceCreator</Title>
          {this.state.show === true ? <h1> {this.state.policies['Property'].id}</h1> : <h1> waiting </h1>}
          <Link to={`/admin/${this.state.invoiceCounter}`}><button> Preview Invoice </button></Link>
          <button onClick={this.saveInvoice.bind(this)}> Save </button>
          
        </div>
        
      )
    
  }
};

export default InvoiceCreator;
