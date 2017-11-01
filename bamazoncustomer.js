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

function purchaseProduct(id, quantity) {
    connection.query("UPDATE(stock_ ")
}


function readProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(`*******************Welcome to the Mike Daye Bamazon Store********************`)
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItem ID: ${res[i].item_id}|| Product: ${res[i].product_name}|| Department: ${res[i].department_name}|| Price: ${res[i].price}|| Quantitiy: ${res[i].stock_quantity}`)
        }
        // console.log(res);
        connection.end();
    });
}

readProducts();