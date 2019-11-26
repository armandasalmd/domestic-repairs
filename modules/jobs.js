const sqlite = require('sqlite-async');

module.exports = class Job {
	constructor(dbJob = ':memory:') {
		return async () => {
			this.db = await sqlite.open(dbJob);
			const sql = `CREATE TABLE IF NOT EXISTS jobs (jobid INTEGER PRIMARY KEY AUTOINCREMENT, 
				manufacturer TEXT, type TEXT, age INT, issue TEXT, status TEXT, 
				techid INT, datetimefrom DATETIME, datetimeto DATETIME);`;
			await this.db.run(sql);
			return this;
		};
	}
	// job status levels - submitted, processed, completed
	async submitJob(manufacturer, type, age, issue) {
		try {
			if (manufacturer.length === 0)
				throw new Error('Choose appliance manufacturer');
			if (type.length === 0) throw new Error('Choose appliance type');
			if (age.length === 0) throw new Error('Enter appliance age');
			if (issue.length === 0) throw new Error('Enter issue description'); // make optional?
			const sql = `INSERT INTO jobs(manufacturer, type, age, issue, status) VALUES("${manufacturer}", 
				"${type}", "${age}", "${issue}", "Submitted")`;
			await this.db.run(sql);
			return true;
		} catch (err) {
			throw err;
		}
	}

	async processJob(technicianID, jobID, datefrom, dateto) {
		try {
			let sql = `SELECT COUNT(jobid) as ticket FROM jobs WHERE jobid="${jobID}";`;
			const data = await this.db.get(sql);
			if (data.ticket === 0)
				throw new Error(`Ticket under ID "${jobID}" does not exist`);
			sql = `SELECT COUNT(techid) as techrecord FROM techs WHERE techid="${technicianID}";`;
			data = await this.db.get(sql);
			if (data.techrecord === 0)
				throw new Error(
					`Technician with ID "${technicianID}" does not exist`
				);
			sql = `UPDATE TABLE jobs SET (status, techid ,datetimefrom, datetimeto) = 
				("Processed", "${technicianID}", "${datefrom}", "${dateto}")`;
			sql = `INSERT INTO techs(job, techid) VALUES("${jobID}", "${technicianID}"`;
		} catch (err) {
			throw err;
		}
	}

	async completeJob(jobID) {
		try {
			let sql = `SELECT COUNT(jobid) as ticket FROM jobs WHERE jobid="${jobID}";`;
			const data = await this.db.get(sql);
			if (data.ticket === 0)
				throw new Error(`Ticket under ID "${jobID}" does not exist`);
			sql = `UPDATE TABLE jobs SET (status, ,datetimefrom, datetimeto) = ("Completed", "NULL", "NULL")`;
		} catch (err) {
			throw err;
		}
	}
};
