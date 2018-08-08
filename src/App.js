import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      response:null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.username, this.state.password)
    axios.post(`http://localhost:8080/authenticateUser`, {
        password:this.state.password,
        username:this.state.username
    }).then((res) => {
        this.setState({ response: res})
    }).catch((err) => {
      this.setState({ response: err.message})
    });
  }

  render() {
    return (
      <div className="login">
        <div >
          <div>
            <h1 className="error">{this.state.response}</h1>
            <h2 className="label">Login</h2>
            <div>
              <div>
                <input onKeyPress={this.handleKeyPress} id="username"onChange={this.handleChange} value={this.state.applicationID} placeholder="UserName" className='input' name="username" type="text" />
                <input onKeyPress={this.handleKeyPress} id="password" onChange={this.handleChange} value={this.state.applicationID} placeholder="Password" className='input' name="password" type="password" />
                <button onClick={this.handleSubmit} className='input'>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
