# bamazon

## Overview
This app allows customers to view and buy products from the command line, and allows managers to view products, add new products, view low inventory, and add inventory. There is also the possibility in future of adding a supervisor role.

## User
The user opens the app by entering 'node index.js' - the list of products for sale will appear. The user is then prompted for which item they would like to buy and how many units they would like to buy. If there is not enough inventory of an item, the customer is notified and the transaction ended. MySQL logs a successful transaction and the user is notified of their total purchase cost.


## Manager
The manager opens the app by entering 'node index.js manager' in the command line. They are given a list of options: viewing the products will display the list of for-sale items, low inventory will display items with inventory less than 5, adding inventory will allow the manager to add inventory to items, and add new product will allow them to add a new product. When the manager is done, there is also an option for logging out to exit the app.

## Video Overview
Here is a link for the video walk-through of the app: [Bamazon Walkthrough](https://youtu.be/p5M0OkQE3IE)
