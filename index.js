const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var products = [{
	id: 1, /*darf keine kommazahlen beinhalten*/
	title: 'Almost Heaven',
	description: 'Einsteiger Yacht f&uuml;r jedermann. Vier Schlafzimmer und "rooftop whirlpool". Knap 500PS. Ideal f&uuml;r den n&auml;chsten Familienausflug.',
	category: 'Luxusyachten',
	image: 'images/produkt1_1.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '20\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Jann Lemm',
		mail: 'mr.lemm@igotmoney.com',
		description: 'Für den Strassenverkehr ungeeignet.',
		stars: 2
	}]
}, {
	id: 2,
	title: 'Wavebreaker',
	description: 'Eine Luxusyacht der Sonderklasse. Ger&auml;umig mit acht Schlafzimmern f&uuml;r bis zu 30 Personen. Mann g&ouml;nnt sich sonst ja nichts!',
	category: 'Luxusyachten',
	image: 'images/produkt1_2.jpg',
	price: {
		value: '42\'000\'000',
		currency: 'CHF'
	},
	reviews: []
}, {
	id: 3, /*darf keine kommazahlen beinhalten*/
	title: 'The Lord',
	description: 'Ein absoluter hingucker! Mit dem "Lord" gelingt der Auftritt am Monaco Hafen bestimmt! An dieser Yacht ist wirklich alles absolut unverhältnissmässig!',
	category: 'Luxusyachten',
	image: 'images/produkt1_3.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '111\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Mr. Money',
		mail: 'hans@muster.com',
		description: 'Realy nice!',
		stars: 5
	}]
}, {
	id: 4, /*darf keine kommazahlen beinhalten*/
	title: 'Iron Lady',
	description: 'Keine Kompromisse! Luxus der Sonderklasse! Der puuure schwimmende Reichtum auf vier Etagen. Drei Pools, vier Bars, Fitnesscenter und vieles mehr.',
	category: 'Luxusyachten',
	image: 'images/produkt1_4.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '200\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Pink Panter',
		mail: 'hans@muster.com',
		description: 'Pool zu klein!',
		stars: 3
	},{
		id: 2,
		name: 'James Black',
		mail: 'hans@muster.com',
		description: 'Ideales Hochzeitsgeschenk!',
		stars: 5
	}
	]
}, {
	id: 5, /*darf keine kommazahlen beinhalten*/
	title: 'King Roger',
	description: 'Mit dieser Yacht sind Sie der "King" auf dem Meer. Luxus puur und doch mit 5500 PS unterwegs. Platz für eine 60ig köpfige Crew. Ein absolutes muss für Yachtfans',
	category: 'Luxusyachten',
	image: 'images/produkt1_5.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '250\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Roger Federer',
		mail: 'hans@muster.com',
		description: 'Toller name!! LOL!',
		stars: 5
	}]
}, {
	id: 6, /*darf keine kommazahlen beinhalten*/
	title: 'The Island',
	description: 'Nein Sie sehen noch gut. Diese Yacht ist eine schwimmendes Inselparadies. Platz für 400 Gäste. 12 Bars, 40 Zimmer, 50m Pool, U-Boot etc.',
	category: 'Luxusyachten',
	image: 'images/produkt1_6.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '550\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Alfred der Gorsse',
		mail: 'hans@muster.com',
		description: 'Geniales Geburtstagsgeschenk für meine Tochter!',
		stars: 5
	},{
		id: 2,
		name: 'Kim Jong Un',
		mail: 'hans@muster.com',
		description: 'Kein Platz für Raketentests. Unbrauchbar!!',
		stars: 1
	},{
		id: 3,
		name: 'Donald Trump',
		mail: 'hans@muster.com',
		description: 'Dieser Komentar wurde vom Administrator entfernt.',
		stars: 5
	}]
},  {
	id: 7, /*darf keine kommazahlen beinhalten*/
	title: 'Little Bird',
	description: 'Klein aber fein! Mit dem Little Bird reisen Sie unglaublich bequem und luxuriös. Platz für bis zu 10 Fluggäste. Hier reisen ALLE First Class!',
	category: 'Privatjets',
	image: 'images/produkt2_1.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '12\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Kasperli',
		mail: 'hans@muster.com',
		description: 'Klein aber oho!',
		stars: 4
	}]
}, {
	id: 8, /*darf keine kommazahlen beinhalten*/
	title: 'The Eagle',
	description: 'Schweben Sie mit dem Eagle wie ein Adler über den Wolken. Noch nie war das Reisen der Superreichen so angenehm wie mit dem Eagle.',
	category: 'Privatjets',
	image: 'images/produkt2_2.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '15\'000\'000',
		currency: 'CHF'
	},
	reviews: []
}, {
	id: 9, /*darf keine kommazahlen beinhalten*/
	title: 'Swan',
	description: 'Der Swand ist einer der edelsten Privatjets auf dem Markt. Platz für bis zu 20 Fluggäste. Heute Dubai, Morgen London. Alles ist möglich!',
	category: 'Privatjets',
	image: 'images/produkt2_3.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '23\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Schwanenkönig',
		mail: 'hans@muster.com',
		description: 'Elegantes Gerät! gefällt!',
		stars: 4
	}]
}, {
	id: 10, /*darf keine kommazahlen beinhalten*/
	title: 'Rich Kid',
	description: 'Der Privatjet für jeden, der absolut nicht mehr weiss wohin mit dem Geld. Innenausstattung aus Adlerholz, Platz für 30 Gäste und vieles mehr.',
	category: 'Privatjets',
	image: 'images/produkt2_4.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '79\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Money Boy',
		mail: 'hans@muster.com',
		description: 'Hat kein Platz in meiner Garage aber sonst top!',
		stars: 4
	}]
}, {
	id: 11, /*darf keine kommazahlen beinhalten*/
	title: 'LEAR JET',
	description: 'Das Nonplusultra der privaten Luftfahrt! 1500kmh Spizze! Mit diesem Privatjet erreichen Sie nicht nur jeden Platz auf Mutter Erde, sondern sogar den Mond!',
	category: 'Privatjets',
	image: 'images/produkt2_5.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '180\'000\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Neil Armstrong',
		mail: 'hans@muster.com',
		description: 'Private Mondflüge sollten verboten werden!',
		stars: 1
	},{
		id: 2,
		name: 'Elon Musk',
		mail: 'hans@muster.com',
		description: 'LOL bis zum Mond! Unsere kommen bis zum Mars!',
		stars: 3
	},{
		id: 3,
		name: 'Donald Trump',
		mail: 'hans@muster.com',
		description: 'Hab mir zwölf gekauft. Einfach weil ich es kann!',
		stars: 5
	}]
}, {
	id: 12, /*darf keine kommazahlen beinhalten*/
	title: 'Family Classic',
	description: 'Mit dem Family Classic erreichen Sie auch die abgelegensten Camping Plätze. Der Einsteiger ins luxus-camping-business. Bietet Platz für bis zu fünf Personen.',
	category: 'Luxus-Wohnmobile',
	image: 'images/produkt3_1.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '250\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Mr. Green',
		mail: 'hans@muster.com',
		description: 'Alles was der kleine Millionär zum campen braucht!',
		stars: 5
	}]
}, {
	id: 13, /*darf keine kommazahlen beinhalten*/
	title: 'MURICA',
	description: 'Der Lastwagen der Luxus-Camper! Wiegt 12 Tonnen und verbraucht locker 50Liter/100Km! Die anderen Gäste auf dem Campingplatz werden vor Neid erblassen!',
	category: 'Luxus-Wohnmobile',
	image: 'images/produkt3_2.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '1\'200\'000',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Captain America',
		mail: 'hans@muster.com',
		description: 'Thas what i need! MUUUURRRICA!!!!',
		stars: 5
	}]
}, {
	id: 14, /*darf keine kommazahlen beinhalten*/
	title: 'Rolling King',
	description: 'Fühlen Sie sich wie ein König! Mit dem Rolling King haben Sie nicht nur eine Fahrende Luxussuit, sondern auch gleich einen Helikopter on Board!',
	category: 'Luxus-Wohnmobile',
	image: 'images/produkt3_3.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '18\'000\'000',
		currency: 'CHF'
	},
	reviews: []
}, {
	id: 15, /*darf keine kommazahlen beinhalten*/
	title: 'President GOLD-EDITION',
	description: 'Sie stehen auf Gold? Dan ist der "President" genau das richtige für Sie! Platz für 40 Gäste, 8Schlafzimmer und vieles mehr!',
	category: 'Luxus-Wohnmobile',
	image: 'images/produkt3_4.jpg',  /* muss so sein url wird im javascript angepasst */
	price: {
		value: '99\'999\'999',
		currency: 'CHF'
	},
	reviews: [{
		id: 1,
		name: 'Der GoldGräber',
		mail: 'hans@muster.com',
		description: 'Nur echtes Gold zählt! nice!',
		stars: 5
	},{
		id: 2,
		name: 'MoneyFlow',
		mail: 'hans@muster.com',
		description: 'Goldschicht zu dünn!',
		stars: 1
	}]
}
];

var cart = [];

app.get('/products', function (req, res) {
	var category = req.query.category;
	res.setHeader('Content-Type', 'application/json');
	if(category) {
		var filteredProducts = products.filter(function(product) {
			return product.category === category;
		});	
		res.send(JSON.stringify(filteredProducts));	
	} else {
		res.send(JSON.stringify(products));
	}  	
})

app.get('/products/:id', function (req, res) {
	var id = req.params.id;
	res.setHeader('Content-Type', 'application/json');
	if(id>products.length) {
		res.status(404).send({ error: 'Invalid product id' })
	} else {
		res.send(JSON.stringify(products[id-1]))
	}
})

app.post('/products/:id/reviews', function(req, res) {
	var id = req.params.id;
	res.setHeader('Content-Type', 'application/json');
	if(id>products.length) {
		res.status(404).send({ error: 'Invalid product id' })
	} else {
		var review = req.body;
		products[id-1].reviews.push(review);
		res.send(products);
	}
});

app.get('/cart', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
  	res.send(JSON.stringify(cart))
})

app.post('/cart', function(req, res) {
	var product = req.body;
	res.setHeader('Content-Type', 'application/json');
	cart.push(product);
	res.send(JSON.stringify(cart));		
});

app.delete('/cart', function(req, res) {
	cart = [];
	res.send(JSON.stringify(cart));		
});

app.delete('/cart/:id', function(req, res) {
    var id = req.params.id;

    for(var a = 0; a< cart.length; a++) {
		if (cart[a].id == id){

            cart.splice(a,1);

			a=cart.length+1;


		}



    }

    res.send(JSON.stringify(cart));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
