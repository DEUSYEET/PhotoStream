import React, { Component } from "react";
import SignUpForm from '../components/signUpForm'


class SignUpPage extends Component {

  state = {};

  componentDidMount(){
    document.title = "Sign Up"
  }

  render() {
    return (
      <div id="loginPage">
        <div id="loginPageForm">
            <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUpPage;
