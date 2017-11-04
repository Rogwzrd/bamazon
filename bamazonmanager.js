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

var availStock = 0;
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
                viewAll(commandPrompt);
                break
            case "View Low Inventory":
                console.log("where that low inventory at?");
                viewLow(commandPrompt);
                break
            case "Add to Inventory":
                console.log("adding inventory...");
                addInv(commandPrompt);
                break
            case "Add New Product":
                console.log("adding new product");
                addNewProduct(commandPrompt)
                break
            case "Exit Program":
                connection.end();
                break
        }
    })
}
function viewAll(cb) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`*******************Products********************`)
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
        }
        cb();
    });
}

function viewLow(cb) {
    connection.query("SELECT * FROM products WHERE stock_quantity < ? ", [3], function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`*******************Products********************`)
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
        }
        cb();
    });
}

function addInv(cb) {
    var choicesArray = [];
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(`*******************Products********************`);
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
            choicesArray.push(res[i].item_id)
        }
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Which item would you like to choose?"

            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to add?"
            }
        ]).then(function(answers){
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + answers.quantity + " WHERE item_id = ? ", [answers.id], function (err, res) {
                if (err) throw err;
                console.log("Updating Quantity")
            });
            console.log("stuff in add inv happened");
            cb();
        })
    })
}

function addNewProduct(cb) {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your new product?"
        },
        {
            type: "input",
            name: "dept",
            message: "What is the name of this product department?"
        },
        {
            type: "input",
            name: "price",
            message: "How much does this product cost?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?"
        }
    ]).then(function(answers) {
        connection.query("INSERT INTO products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?",[answers.name, answers.dept, answers.price, answers.quantity], function(err, res) {
            if (err) throw err;
            cb()
        })
    });
console.log("adding new product");
}

commandPrompt();