const express = require('express')
const app = express()
const bodyParser = require('body-parser'),
	MessagingResponse = require('twilio').twiml.MessagingResponse

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/', (req, res) => {
	const twiml = new MessagingResponse(),
		recipient = req.body.From,
		request = req.body.Body,
		message = twiml.message()

	console.log(request)

	if (RegExp('quokka', 'i').test(request)) {
		message.body(`This is a quokka`)
		message.media('https://quokkas.amyskapers.tech/img/quokka.jpg')
	} else {
		message.body(`This is not a quokka`)
		message.media('https://quokkas.amyskapers.tech/img/remi.jpg')
	}

	res.writeHead(200, { 'Content-Type': 'text/xml' })

	res.end(message.toString())
})

app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})
