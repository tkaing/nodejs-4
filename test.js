import test from 'ava';
var https = require('https');
var nock = require('nock');

test.cb('Form detected', t => {

	t.plan(1);

	https.get('https://thawing-badlands-46914.herokuapp.com', (resp) => {
		
		let data = '';
		
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
		
		// The whole response has been received. Print out the result.
		resp.on('end', () => {		
			
			let contains = data.includes('<form');
  			
  			t.is(contains, true);
			t.end();
		});
	})
	.on('error', (err) => {
		console.log('problem with request: ' + err.message);
	});
});

test.cb('Matching ville', t => {

	t.plan(1);

	// City
	var ville = 'Tokyo';

	// An object of options to indicate where to post to
	var options = {
		host: 'thawing-badlands-46914.herokuapp.com',
		path: '/ville',
		method: 'POST',
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    }
	};

	var req = https.request(options, function (resp) {

		let data = '';
		
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		//The whole response has been received. Print out the result.
		resp.on('end', () => {

			let contains = data.includes(ville);

			t.is(contains, true);
			t.end();
		});
	})
	.on('error', (err) => {
		console.log('problem with request: ' + err.message);
	});

	// write data to request body
	req.write(JSON.stringify({ nom_ville: ville }));
	req.end();
});

test.cb('Ville introuvable', t => {

	t.plan(1);

	// City
	var ville = 'blablahiohsdof';

	// An object of options to indicate where to post to
	var options = {
		host: 'thawing-badlands-46914.herokuapp.com',
		path: '/ville',
		method: 'POST',
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    }
	};

	var req = https.request(options, function (resp) {

		let data = '';
		
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		//The whole response has been received. Print out the result.
		resp.on('end', () => {

			let contains = !data.includes('Ville: ' + ville);
			
			t.is(contains, true);
			t.end();
		});
	})
	.on('error', (err) => {
		console.log('problem with request: ' + err.message);
	});

	// write data to request body
	req.write(JSON.stringify({ nom_ville: ville }));
	req.end();
});

test.cb('POST /ville endpoint returns lattitude for existing city', (t) =>
{
	const city = 'berlin';

	nock('https://geocode.xyz')
		.get(`/${city}?json=1&auth=120967724033644489321x1972`)
		.reply(404);

	t.plan(1);

	// An object of options to indicate where to post to
	var options = {
		host: 'thawing-badlands-46914.herokuapp.com',
		path: '/ville',
		method: 'POST',
		headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    }
	};

	var req = https.request(options, function (resp) {

		let data = '';
		
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		//The whole response has been received. Print out the result.
		resp.on('end', () => {

			console.log(data);
			let contains = !data.includes('Ville: ' + city);
			
			t.is(contains, true);
			t.end();
		});
	})
	.on('error', (err) => {
		console.log('problem with request: ' + err.message);
	});

	// write data to request body
	req.write(JSON.stringify({ nom_ville: city }));
	req.end();
});