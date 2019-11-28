const Orders = require('../modules/orders.js');
//const sqlite = require('sqlite-async');

describe('addNewOrder()', () => {
	/*const defaultOrder = {
		username: 'test',
		aType: 'Hair dryer',
		aManufacturer: 'Samsung',
		aAge: 0,
		issue: 'Dummy issue'
	}*/
	const defaultParams = ['test', 'Hair dryer', 'Samsung', 0, 'Dummy issue'];

	test('missing username', async (done) => {
		expect.assertions(1);
		const orders = await new Orders();
		const params = defaultParams.slice(); // copy array
		params[0] = '';
		await expect(orders.addNewOrder(...params)).rejects.toEqual(
			Error('missing username')
		);
		done();
	});

	test('missing type', async (done) => {
		expect.assertions(1);
		const orders = await new Orders();
		const params = defaultParams.slice(); // copy array
		params[1] = '';
		await expect(orders.addNewOrder(...params)).rejects.toEqual(
			Error('missing appliance type')
		);
		done();
	});

	test('missing manufacturer', async (done) => {
		expect.assertions(1);
		const orders = await new Orders();
		const params = defaultParams.slice(); // copy array
		params[2] = '';
		await expect(orders.addNewOrder(...params)).rejects.toEqual(
			Error('missing appliance manufacturer')
		);
		done();
	});

	test('incorrect age', async (done) => {
		expect.assertions(1);
		const orders = await new Orders();
		const params = defaultParams.slice(); // copy array
		params[3] = 15;
		await expect(orders.addNewOrder(...params)).rejects.toEqual(
			Error('age must be between 0 and 10')
		);
		done();
	});

	test('missing issue', async (done) => {
		expect.assertions(1);
		const orders = await new Orders();
		const params = defaultParams.slice(); // copy array
		params[4] = '';
		await expect(orders.addNewOrder(...params)).rejects.toEqual(
			Error('missing issue')
		);
		done();
	});
});

/*var myDb, orders;

function cleanDatabase(db) {
	db.run('DELETE FROM orders;');
}

function seedDatabase(db) {
	db.run(`INSERT INTO orders (appliance_type, appliance_age,
		appliance_manufacturer, user_issue, order_status, user_id,
		technician_id) VALUES ('Digital camera', 5, 'Samsung',
		'It doesnt start for me, I think that battery is dead',
		'in progress', 'test', 'tech2');
		INSERT INTO orders (appliance_type, appliance_age,
			appliance_manufacturer, user_issue, order_status,
			user_id, technician_id) VALUES ('Ceiling fan', 8,
			'Electrolux', 'Spinning with weird noises',
			'pending', 'test', 'tech');
		INSERT INTO orders (appliance_type, appliance_age,
			appliance_manufacturer, user_issue, order_status,
			user_id, technician_id) VALUES ('Computer', 0,
			'Asus', 'I experience a lot of lags. Please reinstall
			my windows', 'pending', 'test', 'tech2');
		INSERT INTO orders (appliance_type, appliance_age,
			appliance_manufacturer, user_issue, order_status,
			user_id, technician_id) VALUES ('Camera', 5, 'Samsung',
			'It doesnt start for me, I think that battery is dead',
			'completed', 'test2', 'tech2');
		INSERT INTO orders (appliance_type, appliance_age,
			appliance_manufacturer, user_issue, order_status,
			user_id, technician_id) VALUES ('Fan', 8, 'Samsung',
			'Spinning with weird noises', 'pending', 'test', 'tech');
		INSERT INTO orders (appliance_type, appliance_age,
			appliance_manufacturer, user_issue, order_status,
			user_id, technician_id) VALUES ('Computer', 0, 'Dell',
			'I experience a lot of lags. Please reinstall my windows',
			'in progress', 'test2', 'tech');`);
}

function closeDatabase(db) {
	db.close();
}

describe('getOrdersByStatus()', () => {
	beforeAll(async () => {
		const f = async () => {
			myDb = await sqlite.open(':memory:');
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
			await myDb.run(sql);
		};
		await f();
		orders = await new Orders();
	});

	afterAll(() => {
		closeDatabase(myDb);
	});

	beforeEach(() => {
		console.log(11111);
		cleanDatabase(myDb);
		seedDatabase(myDb);
		orders.setDatabase(myDb);
	});

	test('valid call without user_id', async (done) => {
		expect.assertions(2);
		const data = await orders.getOrdersByStatus('pending');
		expect(data).not.toBeNull();
		const correctData1 = {
			appliance_type: 'Ceiling fan',
			appliance_manufacturer: 'Electrolux',
			user_issue: 'Spinning with weird noises',
			order_status: 'pending',
			user_id: 'test'
		};
		expect(data).toContainEqual(correctData1);
		done();
	});
});
*/
