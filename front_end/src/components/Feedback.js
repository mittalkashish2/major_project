import Navbar from './Navbar';

import React from "react";
import axios from 'axios';

export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        //username: "mittalkashish2",
        //email: "",
        //password: "password@123",
        f_var: 0,
        courses: [],
        feedback: ["","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
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
      for (var i = 0; i < this.state.courses.length; i++){
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

      var mres=1;

      for (var i = 0; i < this.state.courses.length; i++){
        if (this.state.feedback[i] !== "1" && this.state.feedback[i] !== "2" && this.state.feedback[i] !== "3" && this.state.feedback[i] !== "4" && this.state.feedback[i] !== "5" ) {
          this.showValidationErr(i, "Valid-Range: 1 to 5 ");
          mres=0;
        }
      }

      if(mres){

        var user = window.localStorage.getItem('user');
        let request = {
          username: user,
          feedback: this.state.feedback,
          //password: this.state.password
        }
        if(!this.state.courses.length)request.feedback = ["$"];
        // console.log(request);
        axios.post('http://localhost:8000/feedback',request)
        .then( resp=> {
          if(!alert(JSON.stringify(resp.data))){window.location.reload();}
          //alert(JSON.stringify(resp.data));
        })
        .catch( err => {
          console.log(err);
        })
      }


    }

    func(){
      console.log("Please get started");
      this.setState({f_var: 1 });
      var user = window.localStorage.getItem('user');
      console.log(user);

      let request = {
        username: user
      }

      axios.post('http://localhost:8000/carray',request)
      .then( resp=> {
        if(!resp.data.arr.length){
          this.setState({courses: []});
          //alert(JSON.stringify("Empty-Received"));
        }
        else{
          //console.log("1");
          this.setState({courses: resp.data.arr});
          //console.log(this.state.courses);
          //alert(JSON.stringify("Received"));
        }
      })
      .catch( err => {
        console.log(err);
      });

      //this.setState({courses: c_array});

      // var course_array = [
      //   {
      //       cid: "CSN401",
      //       cname: "Programming in C"},
      //   {
      //       cid: "CSN404",
      //       cname: "Data Structures and Algorithms"},
      //   {
      //       cid: "CSN304",
      //       cname: "Computer Networks"},
      //   {
      //       cid: "CSN304",
      //       cname: "Computer Networks"},
      //       {
      //         cid: "CSN304",
      //         cname: "Computer Networks"},{
      //           cid: "CSN304",
      //           cname: "Computer Networks"},{
      //             cid: "CSN304",
      //             cname: "Computer Networks"}
      //   ]
      //this.setState({courses: course_array});

      // var cnum = this.state.courses.length;
      // var arr1 = [];
      // console.log(cnum);
      // for (var i = 0; i < cnum; i++) {
      //   arr1.push("");
      // }
      // console.log(arr1);
      // this.setState({feedback: arr1});
      console.log("It goes till the end.")
    }

    //console.log("HELLO, DUNIYA");
  
    render() {

      console.log("It is coming again.")
      if(!this.state.f_var){
        this.func();
      }
      console.log(this.state.feedback);
      
      let Err = [];
      for(var i = 0; i < this.state.courses.length; i++){
        Err[i] = null;
      }
      // let emailErr = null,
      // passwordErr = null,
      // usernameErr = null;
  
      for (let err of this.state.errors) {
        for (i = 0; i < this.state.courses.length; i++){
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
              style={{display: "flex", justifyContent: "center", marginTop: "100px"}}
              className="login-btn_"
              
              onHover={this.submitRegister.bind(this)}
              onClick={this.submitRegister.bind(this)}>SUBMIT
            </button>
  
          </div>
        </div>
  
      );
  
    }
  
  }

