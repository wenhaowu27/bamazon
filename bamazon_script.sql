DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE catelog (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
product_sales DECIMAL(10,2) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

USE bamazon_db;


INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Uncharted 4", 7242.75, "Video Games", 49.95, 105);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("DOOM", 0, "Video Games", 59.99, 200);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Crate of Spam", 0, "Food and Drink", 24.5, 50);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Cool Shades", 0, "Apprael", 75, 5);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Worn Denim Jeans", 0, "Apprael", 54.25, 35);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Survival Towel", 0, "Necessities", 42.42, 42);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Bill and Ted's Excellent Advanture", 0, "Films", 15, 25);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Mad Max: Fury Road", 0, "Films", 25.5, 57);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Monopoly", 152.5, "Board Games", 30.5, 30);
INSERT INTO catelog(product_name, product_sales, department_name, price, stock_quantity)
VALUES ("Yahtzee", 0, "Board Games", 19.95, 23);