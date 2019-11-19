CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appliance_type TEXT NOT NULL,
    appliance_age INTEGER NOT NULL,
    appliance_manufacturer TEXT NOT NULL,
    user_issue TEXT NOT NULL,
    status TEXT NOT NULL,
    user_id TEXT NOT NULL,
    technician_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (username),
    FOREIGN KEY (technician_id) REFERENCES user (username)
);