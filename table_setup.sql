CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL,
    stock_quantity INTEGER,
    product_sales DECIMAL,
    PRIMARY KEY (item_id)
);