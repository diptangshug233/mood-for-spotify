//imports
const path = require("path");
const express = require("express");
const axios = require("axios");
var cors = require("cors");
require("dotenv").config();

//express app
const app = express();
app.use(cors());

//env variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const PORT = process.env.PORT || 8888;

app.use(express.static(path.resolve(__dirname, "../client/build")));

//cookie
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
const stateKey = "spotify_auth_state";

//login
app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  const scope =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";

  const queryParams = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: scope,
    show_dialog: true,
  }).toString();
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

//callback
app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;
        const queryParams = new URLSearchParams({
          access_token,
          refresh_token,
          expires_in,
        }).toString();
        res.redirect(`${FRONTEND_URI}/?${queryParams}`);
      } else {
        const queryParams = new URLSearchParams({
          error: "invalid_token",
        }).toString();
        res.redirect(`/?${queryParams}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

//refresh token
app.get("/refresh_token", function (req, res) {
  var refresh_token = req.query.refresh_token;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }).toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      } else {
        const queryParams = new URLSearchParams({
          error: "invalid_token",
        }).toString();
        res.redirect(`/?${queryParams}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
//start server
app.listen(PORT, () => {
  console.log(`Express app runnning at http://localhost:${PORT}`);
});
