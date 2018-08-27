import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isAuthenticated:null,
      response: null,
      userRoles: [],
      error:null
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
      const loginData = res.data
      this.setState({
        response : loginData, 
        isAuthenticated: loginData.isAuthenticated,
        userRoles: loginData.authorities
      })
    }).catch((err) => {
      this.setState({ error: err.message})
    });

  }

  renderRoles(userRoles){
    console.log(userRoles[0])
    const roles = userRoles.map((role)=>{
      console.log(role)
      return(
        <div>
          <p>{role}</p>
        </div>
      )
    })
    return roles
  }

  render() {
    return (
      <div className="login">
        <div >
      { !this.state.isAuthenticated? <div>
            {this.state.error? <p className='error'>Authentication Failed</p>: null}
            <h2 className="label">Login</h2>
            <div>
              <div>
                <input onKeyPress={this.handleKeyPress} id="username" onChange={this.handleChange} value={this.state.applicationID} placeholder="UserName" className='input' name="username" type="text" />
                <input onKeyPress={this.handleKeyPress} id="password" onChange={this.handleChange} value={this.state.applicationID} placeholder="Password" className='input' name="password" type="password" />
                <button onClick={this.handleSubmit} className='input'>Login</button>
              </div>
            </div>
          </div>: 
            <div> 
            <h1 className="success">Successful Login!</h1>
            <h2>Welcome {this.state.response.userName} </h2>
            <h3> User Roles</h3>
            {this.renderRoles(this.state.userRoles)}
            </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
