const bamazonConnection = require("./connections").bamazon;
const Inquirer = require('inquirer');

let customerControls = function() {
	// If I have time, consider having a separate functions file for things like displaying the products...
	bamazonConnection.queryAsync("SELECT * FROM products").then( data => {
		console.log("==========================");
		data.forEach( item => console.log(`ID: ${item.item_id} | Product: ${item.product_name} | Price: $${item.price}`) );
		console.log("==========================");
		const questions = [
			{
				type: 'input',
				message: 'What item would you like to buy? (Input item ID)',
				name: 'id',
				validate: function(value) {
					if ( value > data.length || value < 1) {
						return false;
					}
					return true;
				}
			},
			{
				type: 'input',
				message: 'How many units would you like to purchase?',
				name: 'units'
			}
		];
		Inquirer.prompt(questions).then( data => {
			bamazonConnection.queryAsync("SELECT * FROM products WHERE item_id = ?", [data.id]).then( result => {
				if ( parseInt(data.units) <= result[0].stock_quantity) {
					let newInventory = result[0].stock_quantity - parseInt(data.units);
					let customerSale = parseInt(data.units) * result[0].price;
					let totalProductSales = customerSale + result[0].product_sales;
					// Do I have to use the ?s for stock quantity and product sale, since i'm figuring it out?
					bamazonConnection.queryAsync(`UPDATE products SET stock_quantity = ?, product_sales =  ? WHERE item_id = ?`, [newInventory, totalProductSales, data.id]).then( () => {
						console.log("==========================");
						console.log(`Your total is: $${customerSale}`);
						bamazonConnection.end();
					})
				}
				else{
					console.log("==========================");
					console.log("Sorry! There's not enough inventory for your order.");
					bamazonConnection.end();
				}
			})
		})
	})
};
module.exports = customerControls;