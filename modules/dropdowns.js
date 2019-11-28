const { maxApplianceAge } = require('../constants');

/**
 * Gives a default list of appliance manufacturers
 * @returns {Array<string>}
 */
function getApplianceManufacturer() {
	return ['Whirlpool', 'Electrolux', 'General Electric', 'LG', 'Samsung'];
}

/**
 * Gives a default list of appliance types
 * @returns {Array<string>}
 */
function getApplianceType() {
	return [
		'Air conditioner',
		'Blender',
		'Bed lamp',
		'Iron',
		'Ceiling fan',
		'Clothes dryer',
		'Computer',
		'Digital camera',
		'Dishwasher',
		'Heater',
		'Hair dryer',
		'Microwave',
		'Oven',
		'Stove',
		'Vacuum cleaner'
	];
}

/**
 * Gives a list of appliance ages from 1 year to 10 years
 * @returns {Array<string>}
 */
function getApplianceAge(limit = maxApplianceAge) {
	const result = [];
	for (let i = 0; i < limit; i++) {
		if (i === 0) result.push('Brand new');
		else if (i === 1) {
			result.push(`${i} year`);
		} else {
			result.push(`${i} years`);
		}
	}
	return result;
}

module.exports = {
	applianceType: getApplianceType(),
	applianceManufacturer: getApplianceManufacturer(),
	applianceAge: getApplianceAge()
};
