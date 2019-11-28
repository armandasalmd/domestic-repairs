const sqlite = require('sqlite-async');

class Orders {
	/**
	 * Initializes the model creating Orders table in database if not exists
	 * @param {Object} dbName Database file name ending .db
	 */
	constructor(dbName = ':memory:') {
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

	setDatabase(database) {
		this.db = database;
	}

	getDatabase() {
		return this.db;
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
	async addNewOrder(object) {
		try {
			this.addNewOrder(...object);
			return true;
		} catch (err) {
			throw err;
		}
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
			const maxAge = 10;
			if (aAge < 0 || aAge > maxAge)
				throw new Error('age must be between 0 and 10');
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
	 * @returns {Array<Object>} Orders filtered by status
	 */
	async getOrdersByStatus(status, technician = undefined) {
		try {
			if (!['pending', 'in progress', 'completed'].includes(status))
				throw new Error('invalid state');

			let sql = '';
			if (technician !== undefined) {
				sql = `SELECT * FROM orders WHERE order_status="${status}" AND technician_id="${technician}";`;
			} else {
				sql = `SELECT * FROM orders WHERE order_status="${status}";`;
			}
			const data = await this.db.all(sql);
			if (data !== null) return data;
			else throw new Error('SQL returned empty object');
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Updates status for provided order_id
	 * @param {string} technician Technician username
	 * @param {string} order_id Order Id
	 * @param {string} order_status status of ['pending', 'in progress', 'completed']
	 */
	async updateOrderStatus(technician = undefined, orderId, orderStatus) {
		try {
			if (!['pending', 'in progress', 'completed'].includes(orderStatus))
				throw new Error('invalid state');
			const sql = `UPDATE orders SET order_status="${orderStatus}" 
				WHERE order_id="${orderId}" AND technician_id="${technician}";`;
			await this.db.run(sql);
		} catch (err) {
			throw err;
		}
	}
}

module.exports = Orders;
