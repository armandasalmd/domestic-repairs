const sqlite = require('sqlite-async');

/**
 * Model class for Orders table
 */
module.exports = class Address {
	/**
	 * Initializes the model creating Address table in database if not exists
	 * @param {Object} dbName Database file name ending .db
	 */
	constructor(dbName = ':memory:') {
		//const f =
		//return f();
		return this.init(dbName);
	}

	async init(dbName = ':memory:') {
		this.db = await sqlite.open(dbName);
		const sql = `CREATE TABLE IF NOT EXISTS address (
			street TEXT NOT NULL,
			city TEXT NOT NULL,
			postcode TEXT NOT NULL,
			user_id TEXT NOT NULL,
			FOREIGN KEY (user_id) REFERENCES user (username)
		);`;
		await this.db.run(sql);
		return this;
	}

	/**
	 * Searches database to retrieve Address associated to the user
	 * @example
	 * // getAddressByUsername('test');
	 * { street: 'Street 42 road', city: 'Wonderland',
	 *   postcode: 'WD2 32D', user_id: 'test' }
	 * @returns {Object} Address for provided username
	 */
	async getAddressByUsername(username) {
		try {
			if (username.length === 0) throw new Error('missing username');
			const sql = `SELECT * FROM address WHERE user_id = '${username}'`;
			const userAddress = await this.db.get(sql);
			if (userAddress === undefined) {
				throw new Error(
					'address record for provided user does not exist'
				);
			}
			return userAddress;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Updates or Adds an address for a given user
	 * @returns {boolean} database operation was successful
	 */
	async addAddress(street, city, postcode, username) {
		try {
			if (street.length === 0) throw new Error('missing street');
			if (city.length === 0) throw new Error('missing city');
			if (postcode.length === 0) throw new Error('missing postcode');
			if (username.length === 0) throw new Error('missing username');

			/*let sql = `SELECT COUNT(*) as records FROM user WHERE username = '${username}'`;
			const userExists = await this.db.get(sql);
			if (userExists.records === 0)
				throw new Error('attempt to add address for non existing user');*/

			let sql = `SELECT COUNT(*) as records FROM address WHERE user_id = '${username}'`;
			const addressExists = await this.db.get(sql);
			if (addressExists.records !== 0) {
				// clears old record
				sql = `DELETE FROM address WHERE user_id = '${username}'`;
				await this.db.run(sql);
			}
			// constructing new sql for inserting data
			sql = `INSERT INTO address VALUES (
                '${street}', '${city}', '${postcode}', '${username}')`;
			await this.db.run(sql);
			return true;
		} catch (err) {
			throw err;
		}
	}

	async close() {
		await this.db.close();
	}
};
