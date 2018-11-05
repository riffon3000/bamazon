DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT,
  product_sales DEC(10,2),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES	('20oz. Hammer', 'Tools', 10.00, 30),
        ('1TB Xbox One X', 'Electronics', 199.00, 0),
        ('Samsung 75" 4K UHD HDR TV', 'Electronics', 399.00, 0),
        ('#2 Philips Screw Driver', 'Tools', 3.00, 20),
        ('2-FT Steel Step Stool', 'Home Improvement', 40.00, 35),
        ('38-Piece Home Repair Tool Set', 'Tools', 20.00, 35),
        ('11-inch iPad Pro Wi-Fi 256GB - Silver', 'Electronics', 950.00, 5),
        ('Sun Glasses', 'Apparel', 7.00, 40),
        ('52-inch Ceiling Fan Brushed Nickel Finish w/3 Blades', 'Home Improvement', 100.00, 45),
        ('Bomber Jacket Slim Fit Lined', 'Apparel', 100.00, 15);

SELECT * FROM products;