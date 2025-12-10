-- Seed data for work order management system

-- Insert customers
INSERT INTO customers (full_name, primary_phone, email) VALUES
('John Smith', '555-0101', 'john.smith@email.com'),
('Sarah Johnson', '555-0102', 'sarah.j@email.com'),
('Michael Chen', '555-0103', 'mchen@email.com'),
('Emily Rodriguez', '555-0104', 'emily.r@email.com'),
('David Kim', '555-0105', 'dkim@email.com');

-- Insert line items (services and products)
INSERT INTO line_items (description, price, sku, item_type) VALUES
-- Services
('Oil Change', 4500, 'SRV-001', 'service'),
('Tire Rotation', 3000, 'SRV-002', 'service'),
('Brake Inspection', 5000, 'SRV-003', 'service'),
('Engine Diagnostic', 12000, 'SRV-004', 'service'),
('AC Repair', 15000, 'SRV-005', 'service'),
('Transmission Flush', 18000, 'SRV-006', 'service'),
('Wheel Alignment', 8500, 'SRV-007', 'service'),
-- Products
('Motor Oil (5W-30)', 2500, 'PRD-001', 'product'),
('Air Filter', 1500, 'PRD-002', 'product'),
('Brake Pads', 6500, 'PRD-003', 'product'),
('Wiper Blades', 2000, 'PRD-004', 'product'),
('Coolant', 1800, 'PRD-005', 'product'),
('Spark Plugs (set of 4)', 4000, 'PRD-006', 'product'),
('Battery', 15000, 'PRD-007', 'product');

-- Insert work orders
INSERT INTO work_orders (user_id, date_created, last_updated) VALUES
(1, '2024-12-01 09:00:00', '2024-12-01 09:00:00'),
(1, '2024-12-05 14:30:00', '2024-12-05 14:30:00'),
(2, '2024-12-03 10:15:00', '2024-12-03 10:15:00'),
(3, '2024-12-07 11:45:00', '2024-12-07 11:45:00'),
(4, '2024-12-08 08:30:00', '2024-12-08 08:30:00'),
(5, '2024-12-09 13:00:00', '2024-12-09 13:00:00');

-- Insert work order details
-- Work Order 1: Oil change + motor oil
INSERT INTO work_order_details (work_order_id, line_item_id, quantity, cached_price) VALUES
(1, 1, 1, 4500),  -- Oil Change service
(1, 8, 1, 2500);  -- Motor Oil product

-- Work Order 2: Tire rotation + wheel alignment
INSERT INTO work_order_details (work_order_id, line_item_id, quantity, cached_price) VALUES
(2, 2, 1, 3000),  -- Tire Rotation
(2, 7, 1, 8500);  -- Wheel Alignment

-- Work Order 3: Brake inspection + brake pads
INSERT INTO work_order_details (work_order_id, line_item_id, quantity, cached_price) VALUES
(3, 3, 1, 5000),   -- Brake Inspection
(3, 10, 1, 6500);  -- Brake Pads

-- Work Order 4: Engine diagnostic + spark plugs + air filter
INSERT INTO work_order_details (work_order_id, line_item_id, quantity, cached_price) VALUES
(4, 4, 1, 12000),  -- Engine Diagnostic
(4, 13, 1, 4000),  -- Spark Plugs
(4, 9, 1, 1500);   -- Air Filter

-- Work Order 5: AC Repair + coolant
INSERT INTO work_order_details (work_order_id, line_item_id, quantity, cached_price) VALUES
(5, 5, 1, 15000),  -- AC Repair
(5, 12, 2, 1800);  -- Coolant (x2)

-- Work Order 6: Transmission flush + multiple products
INSERT INTO work_order_details (work_order_id, line_item_id, quantity, cached_price) VALUES
(6, 6, 1, 18000),  -- Transmission Flush
(6, 11, 1, 2000),  -- Wiper Blades
(6, 14, 1, 15000); -- Battery
