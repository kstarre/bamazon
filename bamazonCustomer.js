const bamazonConnection = require("./connections").bamazon;
const Inquirer = require('inquirer');

// select all products and display them
// inquirer prompt: id of item to buy, amount to buy
// .then...
// check inventory. if low, show insufficient quantity and re-start
// if adequate, update sql database with new inventory quantity, total sales
// and tell customer total sale of order
// re-start

let customerControls = function() {
	// If I have time, consider having a separate functions file for things like displaying the products...
	bamazonConnection.queryAsync("SELECT * FROM products").then( data => {
		data.forEach( item => console.log(`ID: ${item.item_id} | Product: ${item.product_name} | Price: $${item.price}`) );
		const questions = [
			{
				type: 'input',
				message: 'What item would you like to buy? (Input item ID)',
				name: 'id'
			},
			{
				type: 'input',
				message: 'How many units would you like to purchase?',
				name: 'units'
			}
		];
		// add validation to make sure the entered id is correct
		Inquirer.prompt(questions).then( data => {
			bamazonConnection.queryAsync("SELECT * FROM products WHERE item_id = ?", [data.id]).then( result => {
				if ( parseInt(data.units) <= result[0].stock_quantity) {
					let newInventory = result[0].stock_quantity - parseInt(data.units);
					let customerSale = parseInt(data.units) * result[0].price;
					let totalProductSales = customerSale + result[0].product_sales;
					// Do I have to use the ?s for stock quantity and product sale, since i'm figuring it out?
					bamazonConnection.queryAsync(`UPDATE products SET stock_quantity = ?, product_sales =  ? WHERE item_id = ?`, [newInventory, totalProductSales, data.id]).then( () => {
						console.log(`Your total is: $${customerSale}`);
						bamazonConnection.end();
					})
				}
				else{
					console.log("Sorry! There's not enough inventory for your order.");
					bamazonConnection.end();
				}
			})
		})
	})
};
module.exports = customerControls;