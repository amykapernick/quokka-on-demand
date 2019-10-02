"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser"),
  MessagingResponse = require("twilio").twiml.MessagingResponse;

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  // res.write("<h1>Quokkas on Demand!</h1>");
  // res.write('<img src="/img/quokka.jpg" />');
  res.sendFile("../index.html");
  res.end();
});
router.post("/", (req, res) => {
  const twiml = new MessagingResponse(),
    recipient = req.body.From,
    request = req.body.Body,
    message = twiml.message();

  console.log(request);

  if (RegExp("quokka", "i").test(request)) {
    message.body(`This is a quokka`);
    message.media("https://quokkas.amyskapers.tech/img/quokka.jpg");
  } else {
    message.body(`This is not a quokka`);
    message.media("https://quokkas.amyskapers.tech/img/remi.jpg");
  }

  res.writeHead(200, { "Content-Type": "text/xml" });

  res.end(message.toString());
});

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
