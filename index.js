const http = require("http"),
  express = require("express"),
  app = express(),
  MessagingResponse = require("twilio").twiml.MessagingResponse,
  bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", function(req, res) {
//     res.send("Hello World!");
//     client.messages
//       .create({
//         from: `whatsapp:+14155238886`,
//         body: "This is not a quokka",
//         to: `whatsapp:+61438984242`
//       })
//       .then(message => console.log(message.sid));
//   });

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
