const http = require("http"),
  express = require("express"),
  app = express(),
  accountSid = "ACc18864aeacea4b046986060cc2ea52d5",
  authToken = "004ab0f19562120bc01cd461f371aa7b",
  client = require("twilio")(accountSid, authToken),
  MessagingResponse = require("twilio").twiml.MessagingResponse,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(3000, function() {
  console.log("Example App listening on port 3000!");
});
