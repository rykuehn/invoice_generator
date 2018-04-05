import React, { Component } from 'react';
import { Table, FormGroup, InputGroup, FormControl, FieldGroup } from 'react-bootstrap';
 
class PolicyTable extends Component {
  constructor(props){
    super(props);
    
  }
  render(){
    return (
      <Table style={{marginTop: '40px'}} striped bordered condensed hover>
      <tbody>
        <tr>
          <th>Company</th>
          <th>{this.props.info.name}</th>
        </tr>
        <tr>
          <th>Policy</th>
          <th>{this.props.info.policy}</th>
        </tr>
        <tr>
          <th>Carrier</th>
          <th>{this.props.info.carrier}</th>
        </tr>
        <tr>
          <th>Coverage Limits</th>
          <th> 
            <FormGroup>
              <InputGroup>
                <FormControl type="text" id={this.props.info.policy}/>
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </th>
        </tr>
        <tr>
          <th>Policy Term</th>
          <th>{this.props.info.effectiveDate} - {this.props.info.renewalDate}</th>
        </tr>
        <tr>
          <th>Premium</th>
          <th>{this.props.info.premium}</th>
        </tr>
      </tbody>
    </Table>
    ); 
  }
};

export default PolicyTable;