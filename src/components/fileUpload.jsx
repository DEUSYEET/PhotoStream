import React, { Component } from "react";
import axios from "axios";
import { v4 } from "uuid";


class FileUpload extends Component {
  url="";
  componentDidMount(){
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      this.url = "http://localhost:8080/uploadImage";
      } else {
        this.url = "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadImage";
      }
  }
  
  state = {
    file: null,
    id:v4()
  };

  onChooseFile = (evt) => {
    this.setState({
      file: evt.target.files[0],
    });
    document.getElementById(this.state.id).classList = "unsavedButton"
    document.getElementById(this.state.id).innerHTML = "Save Image"
  };
  
  onUploadFile = () => {
    let file = new FormData();
    file.append("file",this.state.file,this.state.file.name)
    axios.post(this.url,file).then(res=>{
      this.props.handler(res);
      document.getElementById(this.state.id).classList = "saveFileButton"
    document.getElementById(this.state.id).innerHTML = "Image Saved"
    });
  };




  render() {
    return (
      <div className="fileUpload">
        <input type="file" accept="image/*" onChange = {this.onChooseFile}></input>
        <div className="saveFileButton" onClick={this.onUploadFile} id={this.state.id}>Save Image</div>
      </div>
    );
  }
}
export default FileUpload;
