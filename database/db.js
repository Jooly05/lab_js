const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database/db.sqlite', (err) =>{
    if (err){
        console.error(err.message)
    }
})
module.exports = db


