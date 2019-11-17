function getApplianceManufacturer() {
	return ['Whirlpool', 'Electrolux', 'General Electric', 'LG', 'Samsung'];
}

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

function getApplianceAge(limit) {
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
	applianceAge: getApplianceAge(10)
};
