import React from "react";
import axios from "axios";


export default class RegisterBox extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        // username: "",
        email: "",
        password: "",
        errors: [],
        pwdState: null,
        // showUsername: true,
        showPassword: true,
        showEmail: true,
        showOtp: false,
        otp: "",
        correctOtp: ""
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
  
    // onUsernameChange(e) {
    //   this.setState({username: e.target.value});
    //   this.clearValidationErr("username");
    // }
  
    onEmailChange(e) {
      this.setState({email: e.target.value});
      this.clearValidationErr("email");
    }
  
    onPasswordChange(e) {
      this.setState({password: e.target.value});
      this.clearValidationErr("password");
  
      this.setState({pwdState: "weak"});
      if (e.target.value.length > 8) {
        this.setState({pwdState: "medium"});
      } else if (e.target.value.length > 12) {
        this.setState({pwdState: "strong"});
      }
  
    }

    onOtpChange(e){
      this.setState({otp: e.target.value});
    }
  
    openPopup(e) {
      console.log("Hello world!ssssssssssssssssssssssssss");
    }
  
    submitRegister(e) {

      if(this.state.showOtp == true) {
        if(this.state.otp == this.state.correctOtp) {
          let request = {
            // username: this.state.username,
            email: this.state.email,
            password: this.state.password
          }
          axios.post('http://localhost:8000/success',request)
          .then(resp => {
            alert(resp.data);
            window.location.reload();
          })
          .catch(err => {
            console.log(err);
          })
          // alert("Successfully Registered!");
        } else{
          alert("OTP incorrect! Please try to register again");
          window.location.reload();
        }
      }
  
      console.log(this.state);
      var mres = 1;
  
      // if (this.state.username === "") {
      //   mres=0;
      //   this.showValidationErr("username", "Username Cannot be empty!");
      // }
      if (this.state.email === "") {
        mres=0;
        this.showValidationErr("email", "Email Cannot be empty!");
      }
      if (this.state.password === "") {
        mres=0;
        this.showValidationErr("password", "Password Cannot be empty!");
      }

      if(mres){
        let request = {
          // username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
        // console.log(request);
        axios.post('http://localhost:8000/register',request)
        .then( resp=> {
          // alert(resp.data);
          // if(!alert(JSON.stringify(resp.data))){window.location.reload();}
          //alert(JSON.stringify(resp.data));
          if(resp.data == "Email already Registered"){
            alert(resp.data);
            window.location.reload();
          } else {
            // console.log(resp.data);
            // alert(resp.data);
            this.setState({correctOtp: resp.data, showOtp: true, showEmail: false, showPassword: false});
          }
        })
        .catch( err => {
          console.log(err);
        })
      }  
    }
  
    render() {
  
      let passwordErr = null,
        emailErr = null;
  
      for (let err of this.state.errors) {
        // if (err.elm === "username") {
        //   usernameErr = err.msg;
        // }
        if (err.elm === "password") {
          passwordErr = err.msg;
        }
        if (err.elm === "email") {
          emailErr = err.msg;
        }
      }
  
      let pwdWeak = false,
        pwdMedium = false,
        pwdStrong = false;
  
      if (this.state.pwdState === "weak") {
        pwdWeak = true;
      } else if (this.state.pwdState === "medium") {
        pwdWeak = true;
        pwdMedium = true;
      } else if (this.state.pwdState === "strong") {
        pwdWeak = true;
        pwdMedium = true;
        pwdStrong = true;
      }
  
      return (
        <div className="inner-container">
          <div className="header">
            Fill in the boxes!
          </div>
          <div className="box">
  
            {/* <div>
              {this.state.showUsername &&           
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
                placeholder="Username"
                onChange={this.onUsernameChange.bind(this)}/>
              <small className="danger-error">{usernameErr? usernameErr: ""}</small>
            </div>}
            </div> */}
        
            <div>
              {this.state.showEmail &&        
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                className="login-input"
                placeholder="Email"
                onChange={this.onEmailChange.bind(this)}/>
              <small className="danger-error">{emailErr? emailErr: ""}</small>
            </div>}
            </div>
  
            <div>
              {this.state.showPassword &&
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                placeholder="Password"
                onChange={this.onPasswordChange.bind(this)}/>
              <small className="danger-error">{passwordErr? passwordErr: ""}</small>
  
              {this.state.password && <div className="password-state">
                <div className={"pwd pwd-weak " + (pwdWeak? "show": "")}></div>
                <div className={"pwd pwd-medium " + (pwdMedium? "show": "")}></div>
                <div className={"pwd pwd-strong " + (pwdStrong? "show": "")}></div>
              </div>}
  
            </div>}
            </div>
            <div>
              {this.state.showOtp &&
            <div className="input-group">
              <label htmlFor="otp">Enter OTP received on your email ID</label>
              <input
                type="text"
                name="otp"
                className="login-input"
                placeholder=""
                onChange={this.onOtpChange.bind(this)}/>
            </div>}
            </div>
  
            <button
              
              type="button"
               
              className="login-btn"
              
              onHover={this.submitRegister.bind(this)}
              onClick={this.submitRegister.bind(this)}>Register
              </button>
  
          </div>
        </div>
        
      );
  
    }
  
  }