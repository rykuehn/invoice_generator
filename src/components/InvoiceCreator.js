import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import { PreviewInvoice } from './PreviewInvoice';
import { DropdownButton, ButtonToolbar, MenuItem, FieldGroup, ControlLabel, FormGroup, FormControl, Button} from 'react-bootstrap';

const Title = styled.h1`
font-size: 1.5em;
color: blue;
`;

const FormTable = styled.table`
border: 1px solid black;
border-collapse: collapse
`
const FormRow = styled.tr`
border: 1px solid black;`

const FormColumn= styled.td`
border: 1px solid black;`

const BUTTONS = ['Directors & Officers', 'Property', 'Workers’ Compensation', 'Product Liability', 'Business Interruption', 'Vehicle'];

class InvoiceCreator extends Component {
  constructor(props) {
    super(props);
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
    this.props.saveInvoiceLink(`/invoice/${this.state.invoiceCounter}`, this.state.invoiceCounter);
    this.setState({invoiceCounter: this.state.invoiceCounter + 1 });
  }

  

  render(){
      return (
        <div>
          <Title>InvoiceCreator</Title>
          <h2> ABE </h2>
          
          {this.state.show === true ? 
          <div>
            <form>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Multiple select</ControlLabel>
              <FormControl componentClass="select" multiple>
                <option value="select">select (multiple)</option>
                <option value="vehicle">Vehicle</option>
              </FormControl>
            </FormGroup>
            </form>
            

            <h1> Notes </h1>
            <p> Please make check payable to "Abe Technology Insurance Brokerage" and mail to: </p>
            <p> Abe Technology</p>
            <p> 232 1/2 San Jose Ave. </p>
            <p> San Francisco, CA 94110 </p>

            <p> To wire payment, please send funds to:
            Account: Abe Technology Insurance Brokerage
            ABA Transit#: 121140399
            Account#: 3302164197

            Please email payments@hiable.com once the wire is sent so we can confirm receipt  </p>
            <p> Abe 232 1/2 San Jose Ave. San Francisco, CA 94110 CA License # : 0L76672 </p>
            </div>

            : <h1> waiting </h1>}
          
          <Link to={`/invoice/${this.state.invoiceCounter}`}><button> Preview Invoice </button></Link>
          <Button type="submit">Submit</Button>
          
        </div>
        
      )
    
  }
};

export default InvoiceCreator;
