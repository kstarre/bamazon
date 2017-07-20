let customerControls = require("./bamazonCustomer");
let managerControls = require("./bamazonManager");
let supervisorControls = require("./bamazonSupervisor");
let nodeArgs = process.argv;

// could i use switches for this?

if(nodeArgs.length < 3) {
	customerControls();
}
else {
	if(nodeArgs[2].toLowerCase() === 'manager') {
		managerControls();
	}
	else if(nodeArgs[2].toLowerCase() === 'supervisor') {
		supervisorControls();
	}
	else {
		console.log("Oops! That is not a recognized command. Try again.");
	}
}