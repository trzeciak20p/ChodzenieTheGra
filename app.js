const express = require("express")
const mysql = require("mysql2")
// const connect_flash = require("connect-flash")

const app = express()
const port = process.env.PORT || 3000
app.listen(8080, () => { console.log(`słuchansko`)})

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))








app.get('/', function(req, res, next){
    res.json({
        "status": "dziaa"
    })


})

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ChodzenieTheGra',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})





