DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price FLOAT,
  stock_quantity INTEGER,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("introductory fight stick", "peripherals",109.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("intermediate fight stick", "peripherals",149.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("proffessional fight stick", "peripherals",199.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('small 29" mountain bike', "bikes",1999.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('medium 29" mountain bike', "bikes",1999.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('large 29" mountain bike', "bikes",1999.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("falafel sandwich", "food",7.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("burrito", "food",6.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("tacos", "food",1.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("small general tso\"s tofu", "food",9.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("large general tso\"s tofu", "food",12.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("small backpack", "outdoor essentials",199.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("large backpack", "outdoor essentials",209.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("one person tent", "outdoor essentials",299.99, 5);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("two person tent", "outdoor essentials", 349.99, 5);

SELECT * FROM products;