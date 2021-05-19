import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import axios from "axios";

const pool = new CognitoUserPool({
  UserPoolId: "us-east-2_r9mOSgn28",
  ClientId: "4id2vq725vkn530cdcj355d0dt",
});

const auth = async (Username, Password) =>
  await new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username,
      Pool: pool,
    });
    const auth = new AuthenticationDetails({
      Username,
      Password,
    });

    user.authenticateUser(auth, {
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (err) => {
        reject(err);
      },
      newPasswordRequired: (data) => {
        resolve(data);
      },
    });
  });

const session = async () =>
  await new Promise((resolve, reject) => {
    const user = pool.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          user.getUserAttributes((err, att) => {
            if (err) {
              reject(err);
            } else {
              resolve({ Session: session, Attributes: att });
            }
          });
        }
      });
    } else {
      reject();
    }
  });

const logout = () => {
  const user = pool.getCurrentUser();
  if (user) {
    user.signOut();
    window.location.href = "/";
  }
};

const getUsername = async (email) =>
  await new Promise((resolve, reject) => {
    let url = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      url = "http://localhost:8080/getUser";
    } else {
      url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getUser";
    }

    let formData = new FormData();
    formData.append("file", JSON.stringify({ email: email }));

    axios
      .post(url, formData)
      .then((res) => {
        let username = res.data.username;
        // console.log(username);
        resolve(username);
      })
      .catch((err) => reject(err));
  });

const getUserDataFromEmail = async (email) =>
  await new Promise((resolve, reject) => {
    let url = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      url = "http://localhost:8080/getUser";
    } else {
      url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getUser";
    }

    let formData = new FormData();
    formData.append("file", JSON.stringify({ email: email }));

    axios
      .post(url, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

const getUserDataFromUsername = async (username) =>
  await new Promise((resolve, reject) => {
    let url = "";
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      url = "http://localhost:8080/getUserFromName";
    } else {
      url =
        "http://guiabackend-env.eba-u9xxwbnm.us-west-1.elasticbeanstalk.com/getUserFromName";
    }

    let formData = new FormData();
    formData.append("file", JSON.stringify({ username: username }));

    axios
      .post(url, formData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });

export {
  auth,
  session,
  logout,
  getUsername,
  getUserDataFromEmail,
  getUserDataFromUsername,
};
