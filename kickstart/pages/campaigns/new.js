import React, { Component } from 'react';
import { Button, Checkbox, Form, Input, Message } from 'semantic-ui-react'

import Layout from '../../components/Layout';

import factory from '../../ethereum/factory';

import web3 from '../../ethereum/web3';

import {Link, Router} from '../../routes';

class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (EVENT) => {
    event.preventDefault();

    this.setState({
      errorMessage: '',
      loading: true
    })

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        })

      Router.pushRoute('/');


    }
    catch (err) {
      this.setState({
        errorMessage: err.message
      })
    }

    this.setState({
      loading:false
    })


  };

  /*  
    onSubmit2 = async (EVENT) => {
      const result = await new web3.eth
        .Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });
    }
  */
  render() {
    return (
      <Layout>

        <h1>New Campaign!</h1>
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
        >
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label='wei'
              labelPosition='right'
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({
                  minimumContribution: event.target.value
                })}
            />
            <label>{this.state.minimumContribution}</label>
          </Form.Field>
          <Message error header="Oops!"
            content={this.state.errorMessage} />

          <Button
            primary
            loading={this.state.loading}
          >
            Create
          </Button>
        </Form>

      </Layout>
    )
  }
}

export default CampaignNew;