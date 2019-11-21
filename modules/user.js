const bcrypt = require('bcrypt-promise');
// const fs = require('fs-extra')
const mime = require('mime-types');
const sqlite = require('sqlite-async');
const saltRounds = 10;

/**
 * Model class for User table
 */
module.exports = class User {
	/**
	 * Initializes the model creating User table in database if not exists
	 * @param {Object} dbName Database file name ending .db
	 */
	constructor(dbName = ':memory:') {
		return (async () => {
			this.db = await sqlite.open(dbName);
			// we need this table to store the user accounts
			const sql = `CREATE TABLE IF NOT EXISTS user (
					username TEXT PRIMARY KEY,
					full_name TEXT NOT NULL,
					email TEXT NOT NULL UNIQUE,
					password TEXT NOT NULL,
					phone_no TEXT NOT NULL UNIQUE,
					type TEXT NOT NULL
				);`;
			await this.db.run(sql);
			return this;
		})();
	}

	/**
	 * Updates User table in database with a new
	 * record if not empty values passed
	 * @param {string} username Username
	 * @param {string} fullName First and last names
	 * @param {string} email Valid email address
	 * @param {string} password Plain password
	 * @param {string} phoneNo User phone number
	 * @param {string} type Account type (user|tech)
	 * @throws {Error} If register was unsuccessful
	 */
	async register(
		username,
		fullName,
		email,
		password,
		phoneNo = 'not provided',
		type = 'user'
	) {
		try {
			if (username.length === 0) throw new Error('missing username');
			if (fullName.length === 0) throw new Error('missing full name');
			if (email.length === 0) throw new Error('missing email');
			if (password.length === 0) throw new Error('missing password');
			if (phoneNo.length === 0) throw new Error('missing phone number');

			let sql = `SELECT COUNT(username) as records FROM user WHERE username='${username}';`;
			const data = await this.db.get(sql);
			if (data.records !== 0)
				throw new Error(`username "${username}" already in use`);
			password = await bcrypt.hash(password, saltRounds);
			sql = `INSERT INTO user VALUES('${username}','${fullName}',
					'${email}','${password}','${username}','${type}')`;
			await this.db.run(sql);
			return true;
		} catch (err) {
			throw err;
		}
	}

	getDatabase() {
		return this.db;
	}

	async uploadPicture(path, mimeType) {
		const extension = mime.extension(mimeType);
		console.log(`path: ${path}`);
		console.log(`extension: ${extension}`);
		//await fs.copy(path, `public/avatars/${username}.${fileExtension}`)
	}

	/**
	 * Performs login checking records in database
	 * @param {string} username Username from login form
	 * @param {string} password Plain password
	 * @throws {Error} If login was unsuccessful
	 * @returns {Object} Json object containing session data for user
	 * {username, fullName, email, type}
	 */
	async login(username, password) {
		try {
			let sql = `SELECT count(username) AS count FROM user WHERE username='${username}';`;
			const records = await this.db.get(sql);
			if (!records.count) throw new Error('User does not exist');
			sql = `SELECT * FROM user WHERE username = "${username}";`;
			const record = await this.db.get(sql);
			const valid = await bcrypt.compare(password, record.password);
			if (valid === false) throw new Error('Wrong password');

			return {
				username: record.username,
				fullName: record.full_name,
				email: record.email,
				type: record.type
			};
		} catch (err) {
			throw err;
		}
	}
};
