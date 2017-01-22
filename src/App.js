import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Catinder</h2>
        </div>
        <p className="App-intro">
          Patounez les chats que vous aimez, ou griffounez les méchants.
        </p>
        <CatView cat="Malibu"/>
      </div>
    );
  }
}

class CatView extends React.Component {
  constructor(props) {
    super(props);
    this.patoune = this.patoune.bind(this);
    this.griffoune = this.griffoune.bind(this);
    this.state = {
      catName: "",
      pictureUrl: ""
    };
  }
  patoune() {
    axios.put(`http://localhost:8080/cat/${this.props.cat}`, {
      patounes: [ this.state.catName ]
    }).then(req => {
      this.displayNext()
    });
  }
  griffoune() {
    axios.put(`http://localhost:8080/cat/${this.props.cat}`, {
      griffounes: [ this.state.catName ]
    }).then(req => {
      this.displayNext()
    });
  }
  displayNext() {
    axios.get(`http://localhost:8080/cat/${this.props.cat}/candidate/first`)
      .then(res => {
        this.setState({
          catName: res.data.name,
          pictureUrl: res.data.picture
        });
      });
  }
  componentDidMount() {
    this.displayNext()
  }
  render() {
    return (
      <div>
        <p>{this.state.catName}</p>
        <div>
          <button onClick={this.patoune}>patoune</button>
          <img src={this.state.pictureUrl} alt="{this.props.catName}" />
          <button onClick={this.griffoune}>griffoune</button>
        </div>
      </div>
    );
  }
}

export default App;
