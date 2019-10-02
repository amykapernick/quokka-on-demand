"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser"),
  accountSid = process.env.ACCOUNT_SID,
  authToken = process.env.AUTHTOKEN,
  MessagingResponse = require("twilio").twiml.MessagingResponse;

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Welcome to Quokkas on Demand</h1>");
  res.write('<img src="/img/quokka.jpg"/>');
  res.end();
});
router.get("/another", (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  client.messages
    .create({
      from: `whatsapp:+14155238886`,
      body: "This is not a quokka",
      media: "https://quokkas.amyskapers.tech/img/remi.jpg",
      to: `whatsapp:+61438984242`
    })
    .then(message => console.log(message.sid));
});

app.post("/", (req, res) => {
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
