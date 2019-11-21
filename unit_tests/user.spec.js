const Accounts = require('../modules/user.js');

describe('register()', () => {
	test('register a valid account', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		const register = await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		expect(register).toBe(true);
		done();
	});

	test('register a duplicate username', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		await expect(
			account.register(
				'doej',
				'Doen Joe',
				'test@test.test',
				'test123',
				'07888888888',
				'tech'
			)
		).rejects.toEqual(Error('username "doej" already in use'));
		done();
	});

	test('error if blank username', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		await expect(account.register('', 'password')).rejects.toEqual(
			Error('missing username')
		);
		done();
	});

	test('error if blank password', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		await expect(
			account.register(
				'doej',
				'Name Surname',
				'asd@gmal.com',
				'',
				'07888888888'
			)
		).rejects.toEqual(Error('missing password'));
		done();
	});
});

describe('uploadPicture()', () => {
	// this would have to be done by mocking the file system
	// perhaps using mock-fs?
});

describe('login()', () => {
	test('log in with valid credentials', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		const valid = await account.login('doej', 'test123');
		expect(Object.keys(valid).length).toBe(4); // must be JSON Object with 4 key attributes
		done();
	});

	test('invalid username', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		await expect(account.login('roej', 'password')).rejects.toEqual(
			Error('User does not exist')
		);
		done();
	});

	test('invalid password', async (done) => {
		expect.assertions(1);
		const account = await new Accounts();
		await account.register(
			'doej',
			'Doen Joe',
			'test@test.test',
			'test123',
			'07888888888',
			'tech'
		);
		await expect(account.login('doej', 'bad')).rejects.toEqual(
			Error('Wrong password')
		);
		done();
	});
});
