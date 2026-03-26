const db = require("./db")

const getAllUsers = (callback) => {
    db.all("SELECT * FROM user ", [], (err, rows) => {
        err ? callback(err, null) : callback(null, rows)
    })
}

const getUsersByEmail = (callback, condition) => {
    condition = '%' + condition + '%'
    db.all("SELECT * FROM user WHERE email LIKE ?", [condition], (err, rows) => {
        err ? callback(err, null) : callback(null, rows)
    })
}

const addUser = ({name, second_name, patronymic, email, birthday, current_balance}, callback) => {
    db.run(
        `INSERT INTO user(name, second_name, patronymic, email, birthday, current_balance)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, second_name, patronymic, email, birthday, current_balance],
        function(err) {
            if (err) {
                callback(err, null)
            } else {
                ID_us = this.lastID
                console.log("ID пользователя: ",ID_us)
                callback(null, {id: ID_us})
            }
        }
    );
}

const getUsersByID = (callback, ID) => {
    db.get('SELECT name, second_name FROM "user" WHERE id = ?', [ID], (err, rows) => {
        err ? callback(err, null) : callback(null, rows)
    })
}

exports.getAllUsers = getAllUsers
exports.getUsersByEmail = getUsersByEmail
exports.addUser = addUser
exports.getUsersByID = getUsersByID
