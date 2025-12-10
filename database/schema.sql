
CREATE TYPE item_enum AS ENUM ('service', 'product');

DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    primary_phone VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS work_orders;
CREATE TABLE work_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    date_created TIMESTAMP NOT NULL,
    last_updated TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES customers(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS work_order_details;
CREATE TABLE work_order_details (
    id SERIAL PRIMARY KEY,
    work_order_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    line_item_id INTEGER,
    cached_price INTEGER NOT NULL,  -- price at time of creation
    FOREIGN KEY (line_item_id) REFERENCES line_items(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS line_items;
CREATE TABLE line_items (
    id SERIAL PRIMARY KEY,
    description VARCHAR(254) NOT NULL,
    price INTEGER NOT NULL,
    sku VARCHAR(80),
    item_type item_enum
);
