"use strict";
require("dotenv").config();

const express = require("express"),
  path = require("path"),
  serverless = require("serverless-http"),
  app = express(),
  bodyParser = require("body-parser"),
  accountSid = process.env.ACCOUNT_SID,
  authToken = process.env.AUTHTOKEN,
  // client = require("twilio")(accountSid, authToken),
  MessagingResponse = require("twilio").twiml.MessagingResponse;

const router = express.Router();
router.get("/", (req, res) => {
  client.messages
    .create({
      from: `whatsapp:+14155238886`,
      body: "This is not a quokka",
      media: "https://quokkas.amyskapers.tech/img/remi.jpg",
      to: `whatsapp:+61438984242`
    })
    .then(message => console.log(message.sid));

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Welcome to Quokkas on Demand</h1>");
  res.write('<img src="/img/quokka.jpg"/>');
  res.end();
});
// router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
// router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => {
  console.log("running here");
});

app.use(bodyParser.urlencoded({ extended: false }));

console.log("running");

router.get("/.netlify/functions/server", function(req, res) {
  console.log("get running");
});

router.post("/.netlify/functions/server", (req, res) => {
  console.log("post running");
  const twiml = new MessagingResponse(),
    recipient = req.body.From,
    request = req.body.Body,
    message = twiml.message();

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

module.exports = app;
module.exports.handler = serverless(app);
