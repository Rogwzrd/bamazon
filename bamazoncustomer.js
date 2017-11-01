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
function userPrompt(){
    inquirer.prompt([
        {
            tpe: "confirm",
            message: "\nHello and welcome to Mike's Bamazon Store\nWould you like to see our inventory?",
            name: "greeting",
            default: Y
        },

]).then(function(answers){
        //what you gon do with at that data
        if (answers.greeting === true) {
            readProducts();
            connection.end();
        }
    })
}
function purchaseProduct(id, quantity) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ? ", [quantity, id], function (err, res) {
        if (err) throw err;
        console.log(res);
    })

}


function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`*******************Products********************`)
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
        }
        // console.log(res);
    });
}

userPrompt();

// readProducts();
// purchaseProduct(3, 2);
// readProducts();
// connection.end();
