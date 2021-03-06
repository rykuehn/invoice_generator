import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ControlLabel, FormGroup, FormControl, Button, Checkbox} from 'react-bootstrap';
import PolicyTable from './PolicyTable';

const Title = styled.h1`
  font-size: 40px;
  color: black;
  font-family: Helvetica;
  margin: 40px;
`;

const TableContainer = styled.div`
  width: 70vw;
  height: auto;
  margin: 0 auto;
`;

class InvoiceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: '',
      show: false,
      selectedPolicies: {},
      renderToPolicyTable: [],
      coverageLimit: {},
    }

    this.renderPolicyTables = this.renderPolicyTables.bind(this);
  }

  componentDidMount() {
    console.log('local storage', localStorage.getItem('invoiceCounter'))
    if(localStorage.getItem('invoiceCounter') === null){
      this.setState({ invoiceCounter: localStorage.getItem('invoiceCounter')});
    }
    axios.get('/data/policies.json')
          .then((response) => {
            const policies = response.data;
            this.setState({ policies, show: true })
          })
          .catch(function (error) {
            console.log(error);
          });

  }

  renderPolicyOptions(policyOptions){
    return policyOptions.map((option, i) => {
       return (
        <Checkbox key={i} value={option.policy}>{option.policy}</Checkbox>
      );
    })
  }

  changeHandler(e){
    var updatedSelectedPolicies = Object.assign({}, this.state.selectedPolicies);
    if(!updatedSelectedPolicies[e.target.value]){
      updatedSelectedPolicies[e.target.value] = 1;
    } else{
      updatedSelectedPolicies[e.target.value] = 0;
    }
    this.setState({selectedPolicies: updatedSelectedPolicies});
  }

  saveInvoice() {
    var data = Object.assign({}, this.state.selectedPolicies, this.state.coverageLimit);
    this.props.saveInvoiceLink(`/invoice/${this.props.invoiceCounter}`, data);
  }

  fillOutPolicyDetails() {
    var renderToPolicyTable = [];
    if(Object.keys(this.state.selectedPolicies).length === 0){
      alert('Please Select at least one policy');
    } else{
      for(var key in this.state.selectedPolicies){
        if(this.state.selectedPolicies[key] === 1) {
          this.state.policies.forEach(item => {
            if(item.policy === key){
              renderToPolicyTable.push(item);
            };
          });
        };
      };
    };

    this.setState({renderToPolicyTable});
  }

  renderPolicyTables(data){
    return data.map((item, i) => {
     return ( <PolicyTable key={i} info={item} /> );
    });
  };

  saveCoverageLimit(e){
    var coverageLimitCopy = Object.assign({}, this.state.coverageLimit);
    coverageLimitCopy[e.target.id] = e.target.value;

    this.setState({coverageLimit: coverageLimitCopy});
  }

  render(){
    const TableDisplay = this.state.renderToPolicyTable.length > 0 ? 
      this.renderPolicyTables(this.state.renderToPolicyTable) : '';

    return (
      <div>
        <Title>Create an Invoice</Title>
        {this.state.show === true ? 
        <TableContainer>
          <form>
          <FormGroup controlId="formControlsSelectMultiple" onChange={this.changeHandler.bind(this)}>
            <ControlLabel>Add Policies (hold down command button to select multiple):</ControlLabel>
              {this.renderPolicyOptions(this.state.policies)}
          </FormGroup>
          </form>
          <Button onClick={this.fillOutPolicyDetails.bind(this)} type="submit">Fill Out Details On These Policies</Button>
          <FormGroup onChange={this.saveCoverageLimit.bind(this)}>
            {TableDisplay}
          </FormGroup>
          {this.state.renderToPolicyTable.length > 0 ? <Link to='/admin'><Button onClick={this.saveInvoice.bind(this)} bsStyle="success" type="submit">Submit</Button></Link> : ''}
        </TableContainer> : ''}
      </div>
    );
  }
};

export default InvoiceCreator;
