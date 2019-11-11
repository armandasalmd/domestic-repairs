const server = require('../index');
const request = require('supertest');

// close the server after each test
afterEach(() => {
	server.close();
});

describe('login requests', () => {

	test('checking if request works', async (done) => {
		const response = await request(server).get('/');
		expect(response.status).toEqual(200);
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

/*describe('Register request', () => {

});
*/
