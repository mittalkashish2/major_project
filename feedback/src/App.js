import React from "react";

export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        username: "mittalkashish2",
        email: "",
        password: "password@123",
        errors: [],
        pwdState: null,
        courses: []
      };
    }
  
    showValidationErr(elm, msg) {
      this.setState((prevState) => ({
        errors: [
          ...prevState.errors, {
            elm,
            msg
          }
        ]
      }));
    }
  
    clearValidationErr(elm) {
      this.setState((prevState) => {
        let newArr = [];
        for (let err of prevState.errors) {
          if (elm !== err.elm) {
            newArr.push(err);
          }
        }
        return {errors: newArr};
      });
    }
  
    onUsernameChange(e) {
      this.setState({username: e.target.value});
      this.clearValidationErr("username");
    }
  
    onEmailChange(e) {
      this.setState({email: e.target.value});
      this.clearValidationErr("email");
    }
  
    onPasswordChange(e) {
      this.setState({password: e.target.value});
      this.clearValidationErr("password");
  
    }
  
    openPopup(e) {
      console.log("Hello World!");
    }
  
    submitRegister(e) {
  
      console.log(this.state);
  
      if (this.state.username !== "1" && this.state.username !== "2" && this.state.username !== "3" && this.state.username !== "4" && this.state.username !== "5" ) {
        this.showValidationErr("username", "Valid-Range: 1 to 5 ");
      }
      if (this.state.email === "") {
        this.showValidationErr("email", "Email Cannot be empty!");
      }
      if (this.state.password === "") {
        this.showValidationErr("password", "Password Cannot be empty!");
      }
  
    }

    //console.log("HELLO, DUNIYA");
  
    render() {
  
      let username_ = null,
        password_ = null;
      
        let usernameErr = null,
        passwordErr = null,
        emailErr = null;
  
      for (let err of this.state.errors) {
        if (err.elm === "username") {
          usernameErr = err.msg;
        }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
        if (err.elm === "email") {
          emailErr = err.msg;
        }
      }

      this.state.courses = [
        {
            cid: "CSN401",
            cname: "Programming in C"},
        
        {
            cid: "CSN404",
            cname: "Data Structures and Algorithms"}
        ]

      console.log(this.state.courses[1].cname);

      /*let courses = []
      let request = {
        username: this.state.username,
        password: this.state.password
      }
      axios.post('http://localhost:5000/courses',request)
      .then( resp=> {
        courses = resp.data.course_array;
      })
      .catch( err => {
        console.log(err);
      });*/

      console.log("Hello, Duniya");
  
      return (
        <div className="inner-container">
          <div className="header">
            FEEDBACK
          </div>
          <div className="box">
            <li>{this.state.course}</li>
  
            <div className="input-group">
              <label htmlFor="us">CSN401: Programming In C  
              <input
                type="text"
                name="user"
                className="login-input"
                onChange={this.onUsernameChange.bind(this)}/>
              <small className="danger-error">{usernameErr? usernameErr: ""}</small></label>
            </div>
  
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="login-input"
                //placeholder="Email"
                onChange={this.onEmailChange.bind(this)}/>
              <small className="danger-error">{emailErr? emailErr: ""}</small>
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                //placeholder="Password"
                onChange={this.onPasswordChange.bind(this)}/>
              <small className="danger-error">{passwordErr? passwordErr: ""}</small>
            </div>
  
            <button
              
              type="button"
               
              className="login-btn"
              
              onHover={this.submitRegister.bind(this)}
              onClick={this.submitRegister.bind(this)}>SUBMIT
            </button>
  
          </div>
        </div>
  
      );
  
    }
  
  }