
import React from 'react';

import axios from 'axios';

export default class LoginBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: ""
      };
    }
  

    onUsernameChange(e) {
      this.setState({username: e.target.value});
      //this.clearValidationErr("email");
    }
  
    onPasswordChange(e) {
      this.setState({password: e.target.value});
      //this.clearValidationErr("password");
    }

    submitLogin(e) { 

      e.preventDefault();

      // console.log(this.state);

      let request = {
        username: this.state.username,
        password: this.state.password
      }
      // let req = JSON.parse(JSON.stringify(request));
      // console.log(request);
      axios.post('http://localhost:8000/login',request)
      .then( resp=> {
        console.log(resp.data.message);
        if(resp.data.message === 'Sucessful login!!') {
          window.localStorage.setItem('user', this.state.username);
          window.location.href = "/home";
        } else if(resp.data.message === 'Incorrect Credentials!!') {
          alert('Incorrect Password!');
          window.location.href = "/";
        } else{
          alert('User not registered');
          window.location.href = "/";
        }
        // window.open('/home');
      })
      .catch( err => {
        console.log(err);   
      })
    }
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Login
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                onChange={this.onUsernameChange.bind(this)}/>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={this.onPasswordChange.bind(this)}/>
            </div>
  
            <button
              type="button"
              className="login-btn"
              onClick={this.submitLogin.bind(this)}>Login
            </button>
  
          </div>
        </div>
      );
    }
  
  }
  
  /*function pop(props) {
    return
  }*/