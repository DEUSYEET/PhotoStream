import React, { Component } from "react";
import LogInForm from '../components/loginForm'


class LoginPage extends Component {

  state = {};

  componentDidMount(){
    document.title = "Login"
  }

  render() {
    return (
      <div id="loginPage">
        <div id="loginPageForm">
            <LogInForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
