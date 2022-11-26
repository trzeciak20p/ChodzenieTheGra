const express = require("express")
const mysql = require("mysql2")
// const connect_flash = require("connect-flash")

const app = express()
const port = process.env.PORT || 3000

app.get('/', function(req, res, next){
    res.json({
        "status": "dziaa"
    })


})

app.listen(8080, () => { console.log(`słuchansko`)})




