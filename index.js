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
    message.media(
      "https://images.unsplash.com/photo-1513333420772-7b64ad15ca96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
    );
  } else {
    message.body(`This is not a quokka`);
    message.media(
      "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });

  res.end(message.toString());
});

app.listen(3000, function() {
  console.log("Example App listening on port 3000!");
});
