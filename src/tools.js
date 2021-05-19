// const cognito = require('amazon-cognito-identity-js')
import axios from "axios";

 const getVidID = (url) => {
  let cleanUrl = url.replace("https://", "").trim();

  if (cleanUrl.includes("youtu.be")) {
    let splitUrl = cleanUrl.split("/");
    return splitUrl[1];
  } else {
    let splitUrl = cleanUrl.split("?v=");
    let cleanSplitUrl = splitUrl[1].split("&");
    return cleanSplitUrl[0];
  }
};

const deleteGuide = (id, token) => {
  let url = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    url = "http://localhost:8080/deleteGuide?guideId=" + id + "&token=" + token;
  } else {
    url =
      "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/deleteGuide?guideId=" +
      id +
      "&token=" +
      token;
  }
  // window.location.href('/')
  fetch(url).then((res) => {
    // console.log(res);
  });
};


const saveChatLog = (roomID, chatLog) => {
  // console.log("Transitioning: ",transitioning);
  let url = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    url = "http://localhost:8080/uploadChatLog";
  } else {
    url =
      "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/uploadChatLog";
  }

  // console.log(roomID, chatLog);

  let formData = new FormData();
  formData.append(
    "file",
    JSON.stringify({
      roomID: roomID,
      chatLog: chatLog,
    })
  );
  axios.post(url, formData).then();

};


export {getVidID, deleteGuide, saveChatLog}