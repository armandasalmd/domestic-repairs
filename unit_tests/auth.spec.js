const server = require('../index');
const request = require('supertest');

// close the server after each test
afterEach(() => {
	server.close();
});

describe('login requests', () => {

	test('checking if request works', async (done) => {
		const response = await request(server).get('/login');
		expect(response.status).toEqual(200);
		done();
	});

	test('empty username', async (done) => {
		const res = await request(server).post('/login').send({user: '', pass: 'test123'});
		expect(res.header.location).toBe('/login/?msg=Username cannot be empty');
		done();
	});

	test('empty password', async (done) => {
		const res = await request(server).post('/login').send({user: 'tesdadst', pass: ''});
		expect(res.header.location).toBe('/login/?msg=Password cannot be empty');
		done();
	});

	test('posting wrong username', async (done) => {
		const res = await request(server).post('/login').send({user: 'tesdadst', pass: 'test123'});
		expect(res.header.location).toBe('/login/?msg=User does not exist');
		done();
	});

	test('posting wrong password', async (done) => {
		const res = await request(server).post('/login').send({user: 'test', pass: 'test123333'});
		expect(res.header.location).toBe('/login/?msg=Wrong password');
		done();
	});
});


describe('register request', () => {
	// const correctDetails = {name: 'John Michel', email: 'test@test.test', user: 'test', pass: 'test123'};
	test('checking if request works', async (done) => {
		const response = await request(server).get('/register');
		expect(response.status).toEqual(200);
		done();
	});

	test('invalid fullname', async (done) => {
		const form = {
			name: 'Jaa',
			email: 'test@test.test',
			user: 'test',
			pass: 'test123'
		};
		let res = await request(server).post('/register').send(form);
		expect(res.header.location).toBe('/register/?msg=Name must include first and last names');
		form.name = undefined;
		res = await request(server).post('/register').send(form);
		expect(res.header.location).toBe('/register/?msg=Name must include first and last names');
		done();
	});

	test('invalid email address', async (done) => {
		const form = {
			name: 'Jaa Maass',
			email: 'testtesttest',
			user: 'test',
			pass: 'test123'
		};
		const res = await request(server).post('/register').send(form);
		expect(res.header.location).toBe('/register/?msg=Enter valid email address');
		done();
	});

	test('invalid username', async (done) => {
		const form = {
			name: 'Jaa Maass',
			email: 'testtes@tt.est',
			user: 't',
			pass: 'test123'
		};
		const res = await request(server).post('/register').send(form);
		expect(res.header.location).toBe('/register/?msg=Username is to short');
		done();
	});

	test('invalid password', async (done) => {
		const form = {
			name: 'Jaa Maass',
			email: 'testtes@tt.est',
			user: 'test',
			pass: 't'
		};
		const res = await request(server).post('/register').send(form);
		expect(res.header.location).toBe('/register/?msg=Password is to short');
		done();
	});

});
