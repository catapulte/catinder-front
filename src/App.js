import React, { Component } from 'react';
import logo from './logo.jpg';
import imagePatoune from './patoune.png';
import imageGriffoune from './griffoune.png';
import './App.css';

const api = { catinder: "http://localhost:8080" }
if (process.env.NODE_ENV === "production") {
  api.catinder = "https://catinder.lolcat.passoire.net"
}

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
    fetch(`${api.catinder}/cats/${this.props.cat}`, {
      method: "PUT",
      headers: new Headers({
		    'Content-Type': 'application/json'
	    }),
      body: JSON.stringify({
        patounes: [ this.state.catName ]
      })
    }).then(response => {
      this.displayNext()
    });
  }
  griffoune() {
    fetch(`${api.catinder}/cats/${this.props.cat}`, {
      method: "PUT",
      headers: new Headers({
		    'Content-Type': 'application/json'
	    }),
      body: JSON.stringify({
        griffounes: [ this.state.catName ]
      })
    }).then(response => {
      this.displayNext()
    });
  }
  displayNext() {
    fetch(`${api.catinder}/cats/${this.props.cat}/candidates/first`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          catName: data.name,
          pictureUrl: data.picture
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
          <a onClick={this.patoune} className="bloc">
            <img src={imagePatoune} alt="patouner" />
          </a>
          <img src={this.state.pictureUrl} alt="{this.props.catName}" className="bloc" />
          <a onClick={this.griffoune} className="bloc">
            <img src={imageGriffoune} alt="griffouner" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
