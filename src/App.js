import "./App.scss";
import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { logout, session, getUsername } from "./components/Authentication";
import Profile from "./pages/Profile";
import ProfilePic from "./components/ProfilePic";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      username: "",
      searchValue: "",
    };
  }
  hide(e) {
    this.setState({
      homeLinks: true,
    });
  }

  componentDidMount() {
    session()
      .then((val) => {
        if (val) {
          // console.log("USER",val);
          let { Value } = val.Attributes[2];
          getUsername(Value).then((data) => {
            // console.log(data);
            this.setState({
              username: data,
            });
          });
          this.setState({
            user: true,
          });
        }
      })
      .catch((err) => console.log(err));

    // console.log(this.props.location);
  }
  render() {
    return (
      <div id="container">
        <div id="mainSidebar">
          {/* <Link to="/">
            <img src="./assets/GuiaLogo1.svg" alt="Logo" id="mainLogo"></img>
          </Link> */}
          {this.state.user ? (
            <div className="signedInButtons">
              <div className="sidebarButton bold profileButton">
                <ProfilePic
                  username={this.state.username}
                  key={this.state.username}
                />
              </div>
              <Link to="/">
                <div className="sidebarButton bold">
                  <span role="img" aria-label="Home Page">
                    {" "}
                    🏠{" "}
                  </span>
                  Guides
                </div>
              </Link>

              <div className="sidebarButton signOutButton" onClick={logout}>
                ⬅ Sign Out
              </div>
            </div>
          ) : (
            <div className="signInButtons">
            <Link to="/">
                <div className="sidebarButton bold">
                  <span role="img" aria-label="Home Page">
                    {" "}
                    🏠{" "}
                  </span>
                  Feed
                </div>
              </Link>
              <Link to="/login">
                <div className="sidebarButton bold">
                  <span role="img" aria-label="Login">
                    🚪
                  </span>
                  &nbsp; Login
                </div>
              </Link>
              <Link to="/signup">
                <div className="sidebarButton bold"><span role="img" aria-label="Sign Up">➕</span> Sign Up</div>
              </Link>
            </div>
          )}
        </div>
        <div id="mainContainer">
          <Switch>
            {/* <Route
              path="/testUpload"
              render={(props) => <FileUpload {...props}></FileUpload>}
            ></Route> */}
            <Route
              path="/profile"
              render={(props) => <Profile {...props} />}
            ></Route>
           
            <Route
              path="/login"
              render={(props) => <LoginPage {...props}></LoginPage>}
            ></Route>
            <Route
              path="/signup"
              render={(props) => <SignUpPage {...props}></SignUpPage>}
            ></Route>
      
            <Route
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  searchValue={this.state.searchValue}
                  Hide={(e) => this.hide(e)}
                ></Home>
              )}
            ></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
