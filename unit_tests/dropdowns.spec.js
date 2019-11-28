const dd = require('../modules/dropdowns');

describe('report form dropdown items', () => {
	test('dropdowns are not null', async done => {
		expect(dd.applianceManufacturer).not.toBe(null);
		expect(dd.applianceType).not.toBe(null);
		expect(dd.applianceAge).not.toBe(null);
		done();
	});

	test('appliance type dd has more than 3 items', async done => {
		expect(dd.applianceType.length).toBeGreaterThan(3);
		done();
	});

	test('appliance manufacturer dd has more than 3 items', async done => {
		expect(dd.applianceManufacturer.length).toBeGreaterThan(3);
		done();
	});

	test('appliance age dd has 10 items', async done => {
		expect(dd.applianceAge.length).toEqual(10);
		done();
	});
});
