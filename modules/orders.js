const sqlite = require('sqlite-async');

/**
 * Model class for Orders table
 */
module.exports = class Orders {
	/**
	 * Initializes the model creating Orders table in database if not exists
	 * @param {Object} dbName Database file name ending .db
	 */
	constructor(dbName = '../database.db') {
		const f = async () => {
			this.db = await sqlite.open(dbName);
			const sql = `CREATE TABLE IF NOT EXISTS orders (
                order_id INTEGER PRIMARY KEY AUTOINCREMENT,
                appliance_type TEXT NOT NULL,
                appliance_age INTEGER NOT NULL,
                appliance_manufacturer TEXT NOT NULL,
                user_issue TEXT NOT NULL,
                order_status TEXT NOT NULL,
                user_id TEXT NOT NULL,
                technician_id TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user (username),
                FOREIGN KEY (technician_id) REFERENCES user (username)
            );`;
			await this.db.run(sql);
			return this;
		};
		return f();
	}

	/**
	 * Adds new record to Order table with provided details
	 * @param {string} username Customer username
	 * @param {string} aType Appliance type (i.e. Oven)
	 * @param {string} aManufacturer Appliance manufacturer (i.e. Electrolux)
	 * @param {number} aAge Appliance age (i.e. 5 years)
	 * @param {string} issue Problem description provided by user
	 * @throws {Error} If operation was unsuccessful
	 */
	async addNewOrder(username, aType, aManufacturer, aAge, issue) {
		try {
			if (username.length === 0) throw new Error('missing username');
			if (aType.length === 0) throw new Error('missing appliance type');
			if (aManufacturer.length === 0)
				throw new Error('missing appliance manufacturer');
			if (aAge.length === 0) throw new Error('missing age');
			if (issue.length === 0) throw new Error('missing issue');
			const sql = `INSERT INTO orders (
                appliance_type, appliance_age, 
                appliance_manufacturer, user_issue, 
                order_status, user_id,
                technician_id) VALUES (
                '${aType}', ${aAge}, 
                '${aManufacturer}', '${issue}',
                'pending', '${username}', 'undefined'
                );`;
			await this.db.run(sql);
			return true;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Finds order records filtered by status
	 * @param {string} status Value that is used to filter order table by status
	 * @return {Array<Object>} Orders filtered by status
	 */
	async getOrdersByStatus(status) {
		try {
			if (!['pending', 'in progress', 'completed'].includes(status))
				throw new Error('invalid state');

			const sql = `SELECT * FROM orders WHERE order_status="${status}";`;
			const data = await this.db.all(sql);
			if (data !== null) return data;
			else throw new Error('SQL returned empty object');
		} catch (err) {
			throw err;
		}
	}
};
