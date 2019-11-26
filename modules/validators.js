/**
 * Checks if name is greater or equeal to 4
 * @param {string} data String to validate
 * @returns {Boolean} Validation successful
 */
function validName(data) {
	return data && data.includes(' ') && data.length >= 5;
}

/**
 * Checks if email contains '@' and is greater than 5
 * @param {string} data String to validate
 * @returns {Boolean} Validation successful
 */
function validEmail(data) {
	// coult implement regex match
	return data && data.includes('@') && data.length >= 6;
}

/**
 * Checks if username is greater or equeal to 3
 * @param {string} data String to validate
 * @returns {Boolean} Validation successful
 */
function validUsername(data) {
	return data && data.length >= 4;
}

/**
 * Checks if password is greater or equeal to 3
 * @param {string} data String to validate
 * @returns {Boolean} Validation successful
 */
function validPassword(data) {
	return data && data.length >= 4;
}

module.exports = {
	name: validName,
	email: validEmail,
	user: validUsername,
	pass: validPassword
};
