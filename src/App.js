import React, { Component } from 'react';
import Layout from './hoc/Layout';
import Stage from './containers/Stage';

class App extends Component {
  render() {
    return (
      <Layout>
        <Stage/>
      </Layout>
    );
  }
}

export default App;
