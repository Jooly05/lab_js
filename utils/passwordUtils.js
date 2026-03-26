const bcrypt = require("bcryptjs")
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

const comparePasswords = async (pass, hashPass) => {
    return await bcrypt.compare(pass, hashPass)
}

exports.hashPassword = hashPassword
exports.comparePasswords = comparePasswords
