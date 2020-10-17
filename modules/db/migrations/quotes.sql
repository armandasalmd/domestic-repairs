CREATE TABLE IF NOT EXISTS quotes (
    cost TEXT NOT NULL,
    description TEXT NOT NULL,
    quote_status TEXT NOT NULL,
    time_from DATE NOT NULL,
    time_to DATE NOT NULL,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (order_id)
);