import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import FacebookLogin from 'react-facebook-login';

import './custom.css'

const responseFacebook = (response) => {
    // todo make safe proper login flow
    console.log("FB RESPONSE")
    document.cookie = "userid="+response.id;
    console.log("UID " + response.id);
    window.location = "http://" + window.location.hostname + ":9000/user="+response.id;
}

export default class App extends Component {
  static displayName = App.name;

    render() {
        return <FacebookLogin
            appId="292881155230780"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook} />
      /*
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
    */
  }
}
