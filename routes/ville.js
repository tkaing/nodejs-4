var express = require('express');
var https = require('https');

var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

	var ville = req.body.nom_ville;
	var description = req.body.description;

	var uri = 'https://geocode.xyz/' + ville + '?json=1&auth=120967724033644489321x1972';

	https.get(uri, (resp) => {
		
		let data = '';
		
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
		
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			var result = JSON.parse(data);
			var message = 'Ville introuvable';
			var success = false;

			if (result.matches !== null && ville !== '') {
				message = ville;
				success = true;
			}

			res.render('ville', { 
				title: 'Node App', 
				ville: ville, 
				description: description,
				longitude: result.longt,
				latitude: result.latt,
				success: success,
				message: message,
			});
		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);

		res.render('ville', { 
			success: false,
			message: 'Oups! Une erreur s\'est produite'
		});
	});
});

module.exports = router;
