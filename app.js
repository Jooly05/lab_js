const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { getAllUsers, getUsersByEmail, addUser, getUsersByID } = require('./database/user')
const { registerAccount } = require("./accountService")
const { loginAccount } = require("./accountService")
const { authentificateToken } = require("./middleware")

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000
const HOST = "localhost"

app.get("/", (req, res)=> {
    res.send("Hello World!")
})

app.post('/api/add-user', (req, res) => {
    console.log("Тело запроса", req.body)
    const {name, second_name, patronymic, email, birthday, current_balance} = req.body
    addUser({name, second_name, patronymic, email, birthday, current_balance}, 
        (err, result) => {
           if (err) {
            return res.status(500).json({error:err.message})
           }
           res.status(201).json(result)
   })
})

app.get("/api/users", (req, res) => {
    getAllUsers((err, users) => {
        if (err) 
            res.status(500).json({error: err})
        res.json(users)
    })
})

app.get("/api/list_users_by_condition", (req, res) => {
    getUsersByEmail((err, users) => {
        if (err) 
            res.status(500).json({error: err})
        res.json(users)
    }, req.query.email)
})

app.listen(PORT, HOST, ()=>{
    console.log(`Server is running at ${HOST}:${PORT}`)
})

app.post("/register", async (req, res) => {
    console.log('Тело запроса: ', req.body)
    try {
        const result = await registerAccount(req.body)
        console.log("result", result)
        res.status(result.status).json(result)
    } catch(err) {
        console.log(err)
        res.status(err.status || 500).json(err)
    }
})

app.post("/login", async (req, res) => {
    console.log('Тело запроса: ', req.body)
    try {
        const result = await loginAccount(req.body)
        console.log("result", result)
        res.status(result.status).json(result)
    } catch(err) {
        console.log(err)
        res.status(err.status || 500).json(err)
    }
})

app.get('/page-user', authentificateToken, async (req, res) => {
    const ID_user = req.jwtData.id
    getUsersByID((err, users) => {
        if (err) 
            res.status(500).json({error: err})
        res.json(users)
    }, ID_user)
})

