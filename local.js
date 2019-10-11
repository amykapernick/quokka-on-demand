require('dotenv').config()

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	accountSid = process.env.ACCOUNT_SID,
	authToken = process.env.AUTHTOKEN,
	client = require('twilio')(accountSid, authToken),
	MessagingResponse = require('twilio').twiml.MessagingResponse

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello Superclass 👋👋')

	client.messages
		.create({
			from: 'whatsapp:+14155238886',
			body: "Hi, I'm at superclass",
			to: 'whatsapp:+61438984242',
		})
		.then(message => console.log(message.sid))
})

app.post('/', (req, res) => {
	const twiml = new MessagingResponse(),
		request = req.body.Body,
		message = twiml.message()

	let photo = Math.floor(Math.random() * 12),
		type = 'jpg'

	if (RegExp(/\d+/).test(request) && request.match(/(\d+)/)[0] < 12) {
		photo = request.match(/(\d+)/)[0]
	}

	if (RegExp('quokka', 'i').test(request)) {
		message.body(`This is a quokka`)
		message.media(`https://quokkas.amyskapers.tech/img/quokka_(${photo}).${type}`)
	} else {
		if (photo > 9) {
			type = 'gif'
			message.body(`This is not a quokka https://quokkas.amyskapers.tech/img/not_quokka_(${photo}).${type}`)
		} else {
			message.body(`This is not a quokka`)
			message.media(`https://quokkas.amyskapers.tech/img/not_quokka_(${photo}).${type}`)
		}
	}

	res.writeHead(200, { 'Content-Type': 'text/xml' })

	res.end(message.toString())
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})
