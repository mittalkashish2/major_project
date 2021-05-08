import Navbar from './Navbar';

import React from "react";

export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        //username: "mittalkashish2",
        //email: "",
        //password: "password@123",
        courses: [],
        feedback: [],
        errors: []
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
  
    onUsernameChange(index,e) {
      var arr = [];
      for (var i = 0; i < this.state.feedback.length; i++){
        arr.push(this.state.feedback[i])
        }
      arr[index]=e.target.value;

      this.setState({feedback: arr});
      this.clearValidationErr(index);
    }
  
    // onPasswordChange(e) {
    //   this.setState({password: e.target.value});
    //   this.clearValidationErr("password");
  
    // }
  
    openPopup(e) {
      console.log("Hello World!");
    }
  
    submitRegister(e) {
  
      console.log(this.state);
      // if (this.state.password === "") {
      //   this.showValidationErr("password", "Password Cannot be empty!");
      // }

      for (var i = 0; i < this.state.feedback.length; i++){
        if (this.state.feedback[i] !== "1" && this.state.feedback[i] !== "2" && this.state.feedback[i] !== "3" && this.state.feedback[i] !== "4" && this.state.feedback[i] !== "5" ) {
          this.showValidationErr(i, "Valid-Range: 1 to 5 ");
        }
      }


    }

    func(){
      console.log("Please get started");
      var user = window.localStorage.getItem('user');
      console.log(user);
      // let request = {
      //   username: user,
      //   password: "password@123"
      // }
      // axios.post('http://localhost:8000/carray',request)
      // .then( resp=> {
      //   this.setState({courses: resp.data.arr});
      //   //alert(resp.data.message);
      // })
      // .catch( err => {
      //   console.log(err);
      // });
      var course_array = [
        {
            cid: "CSN401",
            cname: "Programming in C"},
        {
            cid: "CSN404",
            cname: "Data Structures and Algorithms"},
        {
            cid: "CSN304",
            cname: "Computer Networks"}
        ]
      this.setState({courses: course_array});

      var cnum = this.state.courses.length;
      var arr1 = [];
      
      for (var i = 0; i < cnum; i++) {
        arr1.push("");
      }
      console.log(arr1);
      this.setState({feedback: arr1});
      console.log("It goes till the end.")
    }

    //console.log("HELLO, DUNIYA");
  
    render() {

      if(!this.state.feedback.length)this.func();
      console.log(this.state.feedback);
      
      let Err = [];
      for(var i = 0; i < this.state.feedback.length; i++){
        Err[i] = null;
      }
      // let emailErr = null,
      // passwordErr = null,
      // usernameErr = null;
  
      for (let err of this.state.errors) {
        for (i = 0; i < this.state.feedback.length; i++){
          if(err.elm === i){
            Err[i] = err.msg;
          }
        }

        // if (err.elm === "password") {
        //   passwordErr = err.msg;
        // }
      }

      //console.log(this.state.courses.cid)

      console.log("Hello, Duniya");
  
      return (
        <div className="inner-container">
        <Navbar />
          <div>
              <div style={{textAlign:"center",
              width: "100%", color: "yellow",fontSize:"20px",fontStyle:'italic'}}>
              Please rate the following courses on the scale of 1 to 5 based on:
              </div>

              <div className="header">Does the course meet your expectations?</div>
          </div>
          <div className="box_">
            <div>
              {this.state.courses.map((course,index) => (
                <div className="input-group_" key={index}>
                <label htmlFor={course.cid}>{index+1 + '.) ' + course.cid + ': ' + course.cname} 
                <input
                  type="text"
                  name={course.cid}
                  className="login-input_"
                  onChange={this.onUsernameChange.bind(this, index)}/>
                <small className="danger-error">{Err[index]? Err[index]: ""}</small></label>
              </div>
              ))}

            </div>
  
            {/* <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                //placeholder="Password"
                onChange={this.onPasswordChange.bind(this)}/>
              <small className="danger-error">{passwordErr? passwordErr: ""}</small>
            </div> */}
  
            <button
              
              type="button"
               
              className="login-btn_"
              
              onHover={this.submitRegister.bind(this)}
              onClick={this.submitRegister.bind(this)}>SUBMIT
            </button>
  
          </div>
        </div>
  
      );
  
    }
  
  }

