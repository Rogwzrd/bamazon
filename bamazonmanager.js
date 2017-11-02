var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});
function commandPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "\nWhat would you like to do?\n",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit Program"],
            name: "command"

        }
    ]).then(function (answers) {
        switch (answers.command) {
            case "View Products for Sale":
                console.log("Let's view some products");
                viewAll();
                break
            case "View Low Inventory":
                console.log("where that low inventory at?");
                viewLow();
                break
            case "Add to Inventory":
                console.log("adding inventory...");
                break
            case "Add New Product":
                console.log("adding new product");
                break
            case "Exit Program":
                connection.end();
                break
        }
    })
}
function viewAll() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`*******************Products********************`)
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
        }
        commandPrompt();
    });
    }


// function addProduct() {
//
// }
//
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < ? ", [3], function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`*******************Products********************`)
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
        }
        commandPrompt();
    });
}
//
// function addInv() {
//
// }
//
// function addNewProduct() {
//
// }

commandPrompt();