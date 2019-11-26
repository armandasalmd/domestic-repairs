const menus = require('../modules/menus');

describe('User sidebar menu', () => {
	test('is not null', async (done) => {
		expect(menus.user).not.toBe(null);
		done();
	});

	test('has 2 array items with 2 properties inside', async (done) => {
		expect(menus.user.length).toBe(2);
		expect(menus.user[0].title).not.toBe(null);
		expect(menus.user[0].items.length).toBeGreaterThan(0);
		done();
	});
});

describe('Technician sidebar menu', () => {
	test('is not null', async (done) => {
		expect(menus.technician).not.toBe(null);
		done();
	});

	test('has 2 array items with 2 properties inside', async (done) => {
		expect(menus.technician.length).toBe(2);
		expect(menus.technician[0].title).not.toBe(null);
		expect(menus.technician[0].items.length).toBeGreaterThan(0);
		done();
	});
});
