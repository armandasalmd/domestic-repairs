const sqlite = require('sqlite-async');

/**
 * Model class for Quotes table
 */
module.exports = class Quotes {
	/**
	 * Initializes the model creating Quotes table in database if not exists
	 * @param {Object} dbName Database file name ending .db
	 */
	constructor(dbName = ':memory:') {
		const f = async () => {
			this.db = await sqlite.open(dbName);
			const sql = `CREATE TABLE IF NOT EXISTS quotes (
                cost TEXT NOT NULL,
                description TEXT NOT NULL,
                quote_status TEXT NOT NULL,
                time_from DATE NOT NULL,
                time_to DATE NOT NULL,
                order_id INTEGER NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders (order_id)
            );`;
			await this.db.run(sql);
			return this;
		};
		return f();
	}

	/**
	 * adds record to quotes table with provided values
	 * @param {number} orderId
	 * @param {string} quote
	 * @param {string} price
	 * @param {Date} timeFrom
	 * @param {Date} timeTo
	 * @returns {Boolean} True if successful
	 */
	async provideQuote(
		orderId,
		quote,
		price,
		timeFrom = '2019-11-19 10:00:00',
		timeTo = '2019-11-24 7:00:00'
	) {
		try {
			if (orderId.length === 0) throw new Error('missing order id');
			if (quote.length === 0) throw new Error('missing quote');
			if (price.length === 0) throw new Error('missing price');
			if (!price.includes('£')) price = `£${price}`;
			/*INSERT INTO quotes VALUES ('£5', 'Dont worry, an easy fix', 'accepted', '2019-10-15 10:00:00', '2019-10-22 12:00:00', 6);*/
			const sql = `INSERT INTO quotes VALUES ('${price}', '${quote}', 'pending', '${timeFrom}', '${timeTo}', '${orderId}')`;
			await this.db.run(sql);
			return true;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Queries Quotes table records filtered by technicial name
	 * @param {string} techUsername Technician username
	 * @returns {Array<Object>} Database response
	 */
	async getQuotesByUsername(techUsername) {
		try {
			if (techUsername.length === 0)
				throw new Error('missing technician username');
			// TODO: validate that name provided is technician type but not user
			//
			const sql = `SELECT quotes.cost, quotes.description, quotes.quote_status, 
                quotes.time_from, quotes.time_to, quotes.order_id 
                FROM quotes INNER JOIN orders ON orders.order_id = quotes.order_id 
                WHERE orders.technician_id = '${techUsername}';`;
			const data = await this.db.all(sql);
			return data;
		} catch (err) {
			throw err;
		}
	}
};
