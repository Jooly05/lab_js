const db = require("./database/db")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const {hashPassword, comparePasswords} = require("./utils/passwordUtils")
const registerAccount = async (acc) => {
    try {
        const emailFromDb = await new Promise((resolve, reject) => {
            db.get("SELECT email FROM user WHERE email = ?", [acc.email], (err, row) => {
                if (err) return reject({status: 500, message: `error occurred: ${err.message}`})
                resolve(row)
            })
        })
        if (emailFromDb) throw {status: 400, message: "Пользователь уже существует"};
        const hashedPassword = await hashPassword(acc.password)
        promise = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO user (name, second_name, patronymic, email, birthday, current_balance, password)
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [acc.name, acc.second_name, acc.patronymic, acc.email, acc.birthday, acc.current_balance, hashedPassword], (err) => {
                if (err) {
                    console.log(err)
                    return reject({status: 500, message: `При регистрации произошла ошибка: ${err}`})
                }
                resolve()
            })
        })
        return {status: 200, message: "Регистрация прошла успешно"}
    } catch (err) {
        return err
    }
}

const loginAccount = async (acc) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM user WHERE email = ?", [acc.email], async (err, user) => {
            if (err) return reject({status: 500, message: `Произошла ошибка: ${err.message && err.message}`})
            if (!user) return reject({status: 400, message: "Неверные учетные данные"})

            const isMatch = await comparePasswords(acc.password, user.password)
            if (!isMatch)
                return reject({status: 400, message: "Неверные учетные данные"})
            const token = "Bearer " + jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: "1h"})
            resolve({status: 200, token: token})
        })
    })
}

exports.registerAccount = registerAccount
exports.loginAccount = loginAccount
