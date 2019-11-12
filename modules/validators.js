function validName(data) {
    return data && data.includes(' ') && data.length >= 5;
}

function validEmail(data) {
    // coult implement regex match
    return data && data.includes('@') && data.length >= 6;
}

function validUsername(data) {
    return data && data.length >= 4;
}

function validPassword(data) {
    return data && data.length >= 4;
}

module.exports = {
    name: validName,
    email: validEmail,
    user: validUsername,
    pass: validPassword
};
