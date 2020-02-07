function displayLatestQuokka(url) {
	document.querySelector('#quokka').src = url;
}

function insertQuokkaTest(quokkaResult) {
	const list = document.querySelector('.quokka-or-not .images');
	const isQuokka = quokkaResult.quokka > quokkaResult.notQuokka;
	const quokkaPercent = isQuokka ? quokkaResult.quokka : quokkaResult.notQuokka;
	const result = isQuokka ? 'Quokka' : 'Not';
	const html = `<figure>
		<img src="${quokkaResult.url}" alt="">
		<figcaption>
			<small>${quokkaPercent}% sure</small>
			${result}
		</figcaption>
	</figure>`;
	list.insertAdjacentHTML('afterbegin', html);
}

fetch('https://corn-oyster-5571.twil.io/sync-token').then(result =>
	result.json().then(data => {
		const client = new Twilio.Sync.Client(data.token)

		client.document('quokkabot').then(doc => {
			displayLatestQuokka(doc.value.url);
			doc.on('updated', e => {
				displayLatestQuokka(e.value.url);
			})
		})
		client.list('quokkaTests').then(list => {
			list.on('itemAdded', event => {
				insertQuokkaTest(event.item.data.value)
			});
			return list.getItems()
		}).then(itemPage => {
			itemPage.items.forEach(item => insertQuokkaTest(item.data.value));
		})
	})
)
