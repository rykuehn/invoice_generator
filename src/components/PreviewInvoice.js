import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import PolicyTable from './PolicyTable';

const PreviewWrapper = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center
`

const PreviewForm = styled.div`
  width: 70vw;
`
const Logo = styled.img`
  width: 50%;
  margin-left: 20%;
  margin-top: 20px
`;

const Center = styled.div`
  text-align:center;
  margin=-bottom: 10px;
`;

class PreviewInvoice extends Component {
  constructor(props){
    super(props);

    this.state = {
      policies: '',
    }

    this.renderPolicyTables = this.renderPolicyTables.bind(this);
    this.createTotalTable = this.createTotalTable.bind(this);
  }

  componentWillMount(){
    axios.get('/data/policies.json')
          .then((response) => {
            const policies = response.data;
            this.setState({ policies });
          })
          .catch(function (error) {
            console.log(error);
          });
  }

  renderPolicyTables(toRenderData){
    var complete = [];
    var subTotal = 0;
    for(var key in toRenderData){
      this.state.policies.forEach((item, i) => {
        if(item.policy === key){
          item['coverageLimit'] = toRenderData[key];
          subTotal = subTotal + item.premium;
          complete.push(<PolicyTable key={i} info={item} preview={true} />);
        }
      });
    };
    complete.push(this.createTotalTable(subTotal));
    return complete;
  }

  createTotalTable(subTotal) {
    const fees = subTotal * 0.15;
    const total = subTotal + fees;
    return (
      <Table key="000" striped bordered condensed>
        <tbody>
          <tr>
            <th>Total Premium </th>
            <th>${subTotal}</th>
          </tr>
          <tr>
            <th>Taxes/Fees</th>
            <th>${fees.toFixed(2)}</th>
          </tr>
          <tr>
            <th>Total</th>
            <th>${total}</th>
          </tr>
        </tbody>
      </Table>
    )
  }

  render() {
    return (
      <PreviewWrapper>
        {this.state.policies.length > 0 ?  
        <PreviewForm>
          <Logo src="../../assets/invoice_logo.png"></Logo>
          <h1> Invoice </h1>
          <div>
            {this.renderPolicyTables(this.props.location.generalInvoiceData.data)}
          </div>

          <h1> Notes </h1>
          <h4> Please make check payable to "Abe Technology Insurance Brokerage" and mail to: </h4>
          <Center>
            <h5>Abe Technology Insurance Brokerage</h5>
            <h6>232 1/2 San Jose Ave.</h6>
            <h6>San Francisco, CA 94110</h6>
          </Center>

          <h4> To wire payment, please send funds to: </h4>
          <Center>
            <h5>Account: Abe Technology Insurance Brokerage</h5>
            <h6>ABA Transit#: 121140399</h6>
            <h6>Account#: 3302164197</h6>
          </Center>

          <h4>Please email payments@hiable.com once the wire is sent so we can confirm receipt  </h4>
          <Center>
            <h6>Abe</h6>
            <h6> 232 1/2 San Jose Ave. San Francisco, CA 94110 </h6>
            <h6> CA License # : 0L76672 </h6>
          </Center>
        </PreviewForm>
        : ''}
      </PreviewWrapper>
    )
  }
};

export default PreviewInvoice;
