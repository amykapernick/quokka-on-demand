fetch('https://corn-oyster-5571.twil.io/sync-token').then(result =>
	result.json().then(data => {
		const client = new Twilio.Sync.Client(data.token)

		client.document('quokkabot').then(doc => {
			doc.on('updated', e => {
				console.log(e)

				document.querySelector('#quokka').src = e.value.url
			})
		})
	})
)
