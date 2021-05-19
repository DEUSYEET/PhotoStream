import React, { Component } from "react";
import {
  session,
  getUserDataFromUsername,
  getUsername,
} from "../components/Authentication";
import FileUpload from "../components/fileUpload";
import axios from "axios";

class Profile extends Component {
  id = new URLSearchParams(this.props.location.search).get("user");
  defaultUser = {
    username: "User Not Found",
    email: "",
    image: "",
  };
  state = {
    user: "",
    currentUser: "",
    id: "",
    prevLogs: [""],
  };
  url = "";
  listen = "";

  componentDidMount() {
    // console.log("PROFILE ID", this.id);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      this.url = "http://localhost:8080/createUser";
    } else {
      this.url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/createUser";
    }
    this.listen = this.props.history.listen((location, action) => {
      this.setID(location);
      window.location.reload();
    });
    this.setID();
  }
  
  componentWillUnmount() {
    this.listen();
  }

  getLogs = async () => await new Promise((resolve,reject)=>{
    let url = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      url = "http://localhost:8080/getChatLog";
    } else {
      url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getChatLog";
    }
    let formData = new FormData();
    formData.append(
      "file",
      JSON.stringify({
        roomID: this.state.id,
      })
    );
    axios.post(url, formData).then((val) => {
      // console.log(val.data)
      this.setState({
        prevLogs: val.data.chatLog,
      }, ()=>{
        resolve();
        // console.log(this.state.prevLogs)
      });
    }).catch((err)=>{
      reject(err)
    });
  });

  setID(location = this.props.location) {
    // console.log(location)
    // console.log("URL ID: ", new URLSearchParams(location.search).get("user"));
    this.setState(
      {
        id: new URLSearchParams(location.search).get("user"),
      },
      () => {
        this.getLogs().then(()=>{
          this.getUserData();
        });
      }
    );
  }

  getUserData() {
    // console.log("ID: ", this.state.id);
    document.title = this.state.id;
    getUserDataFromUsername(this.state.id).then((user) => {
      this.setState({
        user: user || this.defaultUser,
      });
      session()
        .then((val) => {
          if (val) {
            let { Value } = val.Attributes[2];
            getUsername(Value).then((currentUser) => {
              this.setState({
                currentUser: currentUser,
              });
            });
          }
        })
        .catch((err) => console.log(err));
    });

  }

  onImageChange = (res) => {
    let user = {
      username: this.state.user.username,
      email: this.state.user.email,
      image: res.data.Location,
    };
    let formData = new FormData();
    formData.append("file", JSON.stringify(user));
    axios.post(this.url, formData).then((res) => {
      this.setState({
        user: res.data,
      });
    });
  };

  defaultImage =
    "https://guia-images.s3-us-west-1.amazonaws.com/Full-Green-Tree-984x1024.png";

  render() {
    return (
      <div className="profileContainer">
        <div id="profile">
          <img
            className="profileImage"
            src={this.state.user.image || this.defaultImage}
            alt={this.state.user.username}
          ></img>
          {this.state.currentUser === this.id ? (
            <FileUpload handler={this.onImageChange} />
          ) : (
            ""
          )}
          <div className="profileUsername">{this.state.user.username}</div>
          <div className="profileEmail">{this.state.user.email}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
