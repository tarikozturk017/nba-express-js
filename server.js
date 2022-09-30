const path = require("path");
const nbaData = require("./modules/nbaData.js");

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/Players", (req, res) => {
  nbaData
    .getAllPlayers()
    .then(function (data) {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "No players found" });
    });
});

app.get("/Teams", (req, res) => {
  nbaData
    .getAllTeams()
    .then(function (data) {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "No teams found" });
    });
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/Players/:lastName", (req, res) => {
  nbaData
    .getPlayersByLastName(req.params.lastName)
    .then(function (data) {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/Teams/:location", (req, res) => {
  nbaData
    .getTeamsByLocation(req.params.location)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.get("/Teams/:teamName", (req, res) => {
  nbaData
    .getTeamByName(req.params.teamName)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "./resource/Status404.png"));
});

nbaData
  .initialize()
  .then(function (msg) {
    console.log(msg);
    app.listen(HTTP_PORT, () => {
      console.log("server listening on port: " + HTTP_PORT);
    });
  })
  .catch(function (err) {
    console.log(err);
  });
