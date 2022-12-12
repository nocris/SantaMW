const express = require('express')
const app = express()
const mysql = require('promise-mysql')
const categoriesRoutes = require('./routes/categoriesRoutes')
const toysRoutes = require('./routes/toysRoutes')
require ('dotenv').config()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) //des qu'on utilise un req.parser ; body parser convertie les string en objet ; app.use le fait dans toutes les routes ; il re-sépare tout
app.use(express.json())

const connectionOptions = {
    host : process.env.host,
    database : process.env.database,
    user : process.env.user,
    password: process.env.password,
    port : process.env.port
}

mysql.createConnection(connectionOptions)
.then(async(db) => {
    categoriesRoutes(app, db)
    toysRoutes(app, db)

})

app.listen(4000,()=>{})


// curl http://127.0.0.1:4000/categories
// curl -d "name=Old School Games" -X PUT http://127.0.0.1:4000/categories/2
// curl -d "name=Water Games" -X POST  http://127.0.0.1:4000/categories
// curl -X DELETE http://127.0.0.1:4000/categories/4