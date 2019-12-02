const Orders = require('../modules/orders.js');
const { dbTest: dbName } = require('../constants');
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

describe('getOrdersByStatusAndUsername()', () => {
	test('correct pending order list request', async (done) => {
		expect.assertions(1);
		const orders = await new Orders(dbName);
		const response = await orders.getOrdersByStatusAndUsername('pending', 'test');
		const answer = 3;
		await expect(response).toHaveLength(answer);
		done();
	});

	test('wrong status code', async (done) => {
		expect.assertions(1);
		const orders = await new Orders(dbName);
		await expect(orders.getOrdersByStatusAndUsername('haha', 'test')).rejects.toEqual(
			Error('invalid state')
		);
		done();
	});

	test('empty username', async (done) => {
		expect.assertions(1);
		const orders = await new Orders(dbName);
		await expect(orders.getOrdersByStatusAndUsername('pending', '')).rejects.toEqual(
			Error('invalid username')
		);
		done();
	});
});
