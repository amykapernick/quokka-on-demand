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
	res.send('Hello World!')
})

app.post('/', (req, res) => {
	const twiml = new MessagingResponse(),
		recipient = req.body.From,
		request = req.body.Body,
		message = twiml.message(),
		photo = Math.floor(Math.random() * 12)
	let type = 'jpg'

	if (RegExp('quokka', 'i').test(request)) {
		message.body(`This is a quokka`)
		message.media(`https://quokkas.amyskapers.tech/img/quokka_(${photo}).${type}`)
	} else {
		if (photo > 9) {
			type = 'gif'
		}
		message.body(`This is not a quokka`)
		message.media(`https://quokkas.amyskapers.tech/img/not_quokka_(${photo}).${type}`)
	}

	res.writeHead(200, { 'Content-Type': 'text/xml' })

	res.end(message.toString())
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})
