import React from "react";


import LoginBox from "../components/Login";
import RegisterBox from "../components/Register";
import FadeTransition from "../transitions/fadeTransition";
// import '../_loginSty.scss';
// import '../_timerSty.scss';

export default class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoginOpen: true,
        isRegisterOpen: false
      };
    }
  
    showLoginBox() {
      this.setState({isLoginOpen: true, isRegisterOpen: false});
    }
  
    showRegisterBox() {
      this.setState({isRegisterOpen: true, isLoginOpen: false});
    }
  
  
    render() {
  
      return (
        <div className="root-container">
  
          <div className="box-controller">
            <div
              className={"controller " + (this.state.isLoginOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showLoginBox
              .bind(this)}>
              Login
            </div>
            <div
              className={"controller " + (this.state.isRegisterOpen
              ? "selected-controller"
              : "")}
              onClick={this
              .showRegisterBox
              .bind(this)}>
              Register
            </div>
          </div>
   
          <FadeTransition isOpen={this.state.isLoginOpen}>
            <div className="box-container">
              <LoginBox />
            </div>
          </FadeTransition>
          <FadeTransition isOpen={this.state.isRegisterOpen}>
            <div className="box-container">
              <RegisterBox />
            </div>
          </FadeTransition>
  
        </div>
      );
  
    }
  
  }