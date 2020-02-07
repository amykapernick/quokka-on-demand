# Quokkas on Demand

This will send you quokkas on demand (if you ask nicely).

This is a bot built with [Twilio](https://quokkas.amyskapers.tech/Twilio) and their [WhatsApp API](https://www.twilio.com/whatsapp) for [Twilio Engage](https://twilioengage.com/sydney2019) in Sydney.

Currently running on [Twilio Functions](https://www.twilio.com/docs/runtime/functions) using the following code:

```js
exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.MessagingResponse(),
		request = event.Body,
		message = twiml.message()

	console.log(event.Body)

	let photo = Math.floor(Math.random() * 12),
		type = 'jpg'

	if (RegExp(/\d+/).test(request) && request.match(/(\d+)/)[0] < 12) {
		photo = request.match(/(\d+)/)[0]
	}

	if (RegExp('quokka', 'i').test(request)) {
		message.body(`This is a quokka`)
		message.media(`https://quokkas.amyskapers.dev/img/quokka_(${photo}).${type}`)
	} else {
		if (photo > 9) {
			type = 'gif'
			message.body(`This is not a quokka https://quokkas.amyskapers.dev/img/not_quokka_(${photo}).${type}`)
		} else {
			message.body(`This is not a quokka`)
			message.media(`https://quokkas.amyskapers.dev/img/not_quokka_(${photo}).${type}`)
		}
	}

	callback(null, twiml)
}

```
