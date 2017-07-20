let customerControls = require("./bamazonCustomer");
let managerControls = require("./bamazonManager");
let supervisorControls = require("./bamazonSupervisor");
let nodeArgs = process.argv;

if(nodeArgs.length < 3) {
	customerControls();
}
else {
	if(nodeArgs[2].toLowerCase() === 'manager') {
		managerControls();
	}
	if(nodeArgs[2].toLowerCase() === 'supervisor') {
		supervisorControls();
	}
}