
var express = require("express"),
	bodyParser = require("body-parser");
	mysql = require("mysql");
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'sql_db'
});

app.get('/', (req, res) => {
	var q='SELECT COUNT(*) as total FROM users';
	connection.query(q, (err, results) => {
		if (err) throw err;
		var usersNumber = results[0].total;
		res.render('home', {total: usersNumber});
	});
});

app.post('/register', (req, res) => {
	var user = {email: req.body.email};
	connection.query('INSERT INTO users SET ?', user, (err, result) => {
		if (err) throw err;
		res.redirect('/');
	});
});

app.listen(process.env.PORT || 3000, process.env.IP, (req, res) => {
	console.log("running!");
});



// var mysql = require("mysql");
// var faker = require('faker');

// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	database: 'sql_db'
// });

// var data = [];
// for (var i = 0; i < 500; i++) {
// 	data.push([
// 		faker.internet.email(),
// 		faker.date.past(),
// 	]);
// }

// var q = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(q, [data], (err, result) => {
// 	console.log(err);
// 	console.log(result);
// });

// connection.end();