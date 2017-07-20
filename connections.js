const password = require('./passwords').mysql;
const MySQL = require('mysql');
const Promises = require('bluebird');

Promises.promisifyAll(require("mysql/lib/Connection").prototype);
Promises.promisifyAll(require("mysql/lib/Pool").prototype);

let bamazonConnection = MySQL.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: password,
	database: "bamazon"
});

let allConnections = {
	'bamazon' : bamazonConnection
};

module.exports = allConnections;