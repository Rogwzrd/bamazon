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
var availStock = [];
var purchaseNum = 0;

function greetingPrompt(){
    inquirer.prompt([
        {
            tpe: "confirm",
            message: "\nHello and welcome to Mike's Bamazon Store\nWould you like to see our inventory?",
            name: "greeting",
            default: true
        }
]).then(function(answers){
        //what you gon do with at that data
        if (answers.greeting === true) {
            readProducts();
            purchasePrompt();
        }
    })
}

function purchasePrompt() {
    inquirer.prompt([
        {
            type: "input",
            message: "\nWhich product would you like?",
            name: "id"
        },
        {
            type: "inut",
            message: "\nHow many would you like?",
            name: "quantity"
        }
    ]).then(function(answers){
        purchaseProduct(answers.id, answers.quantity);
    })
}
function purchaseProduct(id, quantity) {

    connection.query("SELECT * FROM products WHERE item_id = ?", [id], function(err, res) {
        if (err) throw err;
        if (res) {
            console.log(`The result of the product search for purchase ${JSON.stringify(res, null, 2)}`)
            availStock.push(res[0]["stock_quantity"]);
            console.log(`The availabe stock is ${availStock}`);
        }
        checkstock(id, quantity)
    })
}
function checkstock(id, quantity) {
    if (availStock < quantity) {
        console.log("Insufficient quantity!")
        connection.end();
    } else {
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ? ", [availStock - quantity, id], function (err, res) {
            if (err) throw err;
            console.log(`Order Processed!`)
            readProducts(id, quantity)
        })
    }
}

//this function reads the contents of the products table in the bamazon database
function readProducts(id, quantity) {

    //if there is no argument then show all of the products
    if (!id) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(`*******************Products********************`)
            for (var i = 0; i < res.length; i++) {
                console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
            }
        });
        //if there is an argument then read is apart of a callback that follows the purchase prompt
    } else {
        connection.query("SELECT * FROM products WHERE item_id = ?", [id],function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            console.log(`*******************Checkout********************`);
            for (var i = 0; i < res.length; i++) {
                // console.log(`\nItem ID: ${res.item_id}|| Product: ${res.product_name}|| Department: ${res.department_name}|| Price: ${res.price}|| Quantitiy: ${res.stock_quantity}`);
                console.log(`\nEnjoy your ${res[i].product_name}\nYour purchase total is ${res[i].price * quantity}`);
                connection.end()
            }
        });
    }
}

greetingPrompt();
