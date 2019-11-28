const Accounts = require('../modules/user.js');
const Address = require('../modules/address.js');

describe('addAddress()', () => {
	test('valid function call', async (done) => {
		expect.assertions(2);
		const account = await new Accounts();
		const address = await new Address();
		let success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		success = await address.addAddress(
			'My street 50',
			'Wonderland',
			'WL1 23L',
			'doej'
		);
		expect(success).toBe(true);
		//address.close();
		done();
	});

	test('empty postcode', async (done) => {
		expect.assertions(2);
		const address = await new Address();
		const account = await new Accounts();
		const success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		await expect(
			address.addAddress('My street 50', 'Wonderland', '', 'doej')
		).rejects.toEqual(Error('missing postcode'));
		//address.close();
		done();
	});

	/*test('passing not existing user', async (done) => {
		expect.assertions(2);
		const address = await new Address();
		const account = await new Accounts();
		let success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		await expect(address.addAddress(
			'My street 50',
			'Wonderland',
			'WL1 23L',
			'joker'
		)).rejects.toEqual(Error('attempt to add address for non existing user'));
		done();
	});*/

	test('updating existing address', async (done) => {
		expect.assertions(3);
		const address = await new Address();
		const account = await new Accounts();
		let success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		success = await address.addAddress(
			'My street 50',
			'Wonderland',
			'WL1 23L',
			'doej'
		);
		expect(success).toBe(true);
		success = await address.addAddress(
			'My street 51',
			'Sumerland',
			'WL1 24L',
			'doej'
		);
		expect(success).toBe(true);
		//address.close();
		done();
	});
});

describe('getAddressByUsername()', () => {
	test('valid function call', async (done) => {
		expect.assertions(3);
		const address = await new Address();
		const account = await new Accounts();
		let success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		success = await address.addAddress(
			'My street 50',
			'Wonderland',
			'WL1 23L',
			'doej'
		);
		expect(success).toBe(true);
		const dbResponse = await address.getAddressByUsername('doej');
		expect(Object.keys(dbResponse).length).toBe(4);
		done();
	});

	test('empty username', async (done) => {
		expect.assertions(3);
		const address = await new Address();
		const account = await new Accounts();
		let success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		success = await address.addAddress(
			'My street 50',
			'Wonderland',
			'WL1 23L',
			'doej'
		);
		expect(success).toBe(true);
		expect(address.getAddressByUsername('')).rejects.toEqual(
			Error('missing username')
		);
		done();
	});

	test('passing invalid username', async (done) => {
		expect.assertions(3);
		const address = await new Address();
		const account = await new Accounts();
		let success = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(success).toBe(true);
		success = await address.addAddress(
			'My street 50',
			'Wonderland',
			'WL1 23L',
			'doej'
		);
		expect(success).toBe(true);
		await expect(address.getAddressByUsername('wronguser')).rejects.toEqual(
			Error('address record for provided user does not exist')
		);
		done();
	});
});
