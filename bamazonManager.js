const bamazonConnection = require("./connections").bamazon;
const Inquirer = require('inquirer');
// const Promises = require('bluebird');

let managerControls = function() {
	Inquirer.prompt([
		{
			type: 'list',
			name: 'operation',
			message: 'What would you like to do?',
			choices: [
				{
					name: "View products for sale",
					value: 'viewProduct'
				},
				{
					name: "View low inventory",
					value: 'lowInventory'
				},
				{
					name: "Add to inventory",
					value: "addInventory"
				},
				{
					name: "Add new product",
					value: 'addProduct'
				},
				{
					name: "Log out",
					value: 'exit'
				}
			]
		}
	]).then( data => {
		switch (data.operation) {
			case "viewProduct" :
				displayProduct();
			break;

			case "lowInventory" :
				displayInventory();
			break;

			case "addInventory" :
				addInventory();
			break;

			case "addProduct" :
				newProduct();
			break;

			case "exit" :
				exitProgram();
			break;
		}
	})
};

function displayProduct() {
	bamazonConnection.queryAsync("SELECT * FROM products").then( data => {
		console.log("==========================");
		data.forEach( item => console.log(`ID: ${item.item_id} | Product: ${item.product_name} | Price: $${item.price} | Quantity: ${item.stock_quantity}`) );
		console.log("==========================");
		managerControls();
	});
};

function displayInventory() {
	bamazonConnection.queryAsync("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 4").then( data => {
		console.log("==========================");
		data.forEach( item => console.log(`ID: ${item.item_id} | Product: ${item.product_name} | Quantity: ${item.stock_quantity}`) );
		console.log("==========================");
		managerControls();
	});
};

function addInventory() {
	bamazonConnection.queryAsync("SELECT * FROM products").then( data => {
		data = data.map(item => {
			return {
				name: `ID: ${item.item_id} | Product: ${item.product_name} | Quantity: ${item.stock_quantity}`,
				value: item.item_id
			}
		});
		const questions = [
			{
				type: 'list',
				message: 'Which item would you like to add inventory to?',
				name: 'product',
				choices: data
			},
			{
				type: 'text',
				message: 'How many units would you like to add?',
				name: 'units'
			}
		];
		Inquirer.prompt(questions).then( data => {	
			bamazonConnection.queryAsync("SELECT stock_quantity FROM products WHERE item_id = ?", [data.product]).then( result => {
				// could i do this addition in sql?
				let newInventory = parseInt(data.units) + result[0].stock_quantity;
				bamazonConnection.queryAsync("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [ newInventory, data.product ]).then( () => {
					console.log("Inventory added!");
					console.log("==========================");
					managerControls();
				})
			})
		})
	})
};

function newProduct() {
	const questions = [
		{
			type: 'input',
			message: 'What is the name of the product?',
			name: 'name'
		},
		{
			type: 'input',
			message: 'What department is the product in?',
			name: 'department'
		},
		{
			type: 'input',
			message: 'What is the unit price?',
			name: 'price'
		},
		{
			type: 'input',
			message: 'How many units in inventory?',
			name: 'inventory'
		}
	];
	Inquirer.prompt(questions).then( data => {
		const insertQuery = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
		bamazonConnection.queryAsync(insertQuery, [data.name, data.department, data.price, data.inventory]).then( () => {
			console.log("Item added!");
			console.log("==========================");
			managerControls();
		})
	})
};

function exitProgram() {
	const questions = [
		{
			type: 'list',
			message: 'Are you sure you want to log off?',
			name: 'exitChoice',
			choices: [
				{
					name: 'Yes',
					value: true
				},
				{
					name: 'No',
					value: false
				}
			]
		}
	];
	Inquirer.prompt(questions).then( data => {
		if (data.exitChoice) {
			bamazonConnection.end();
		}
		else {
			managerControls();
		}
	})
};

module.exports = managerControls;