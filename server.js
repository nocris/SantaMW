const express = require('express')
const app = express()
const mysql = require('promise-mysql')
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) //des qu'on utilise un req.parser ; body parser convertie les string en objet ; app.use le fait dans toutes les routes ; il re-sépare tout

// parse application/json
app.use(bodyParser.json())

const connectionOptions = {
    host : "localhost",
    database : "SantaMW",
    user : "root",
    password:"root",
    port : 8889
}

mysql.createConnection(connectionOptions)
        .then(async(db) => {
            app.get('/',(req,res)=>{
                res.json('bien connecté mec wesh')
            })
            
            //Get All
            app.get('/categories', async(req,res)=>{
                try{
                responseDB = await db.query(`SELECT * FROM categories`)
                res.send(responseDB)
                }catch{
                    res.sendStatus(404)
                }

            })

            //Get by ID
            app.get('/categories/:id', async(req,res)=>{               
                const id = req.params.id
                responseDB = await db.query(`SELECT * FROM categories WHERE id = '${id}'`)
                if(responseDB == undefined){
                    res.sendStatus(404)
                }else{
                res.send(responseDB)
                }
            })

            app.post('/categories', async(req,res)=>{
                const name = req.body.name 
                const responseDB = await db.query('INSERT INTO categories ( name) VALUES (?)',[name])
                res.send({status:200,responseDB})
            })

            app.put('/categories/:id', async(req,res)=>{
                const id = req.params.id
                const name = req.body.name
                responseDB = await db.query(`UPDATE categories SET name=? WHERE id = '${id}'`, [name])
                res.send({status:200,responseDB}) 
            })

            app.delete('/categories/:id', async(req,res)=>{
                const id = req.params.id
                responseDB = await db.query(`DELETE FROM categories WHERE id = '${id}'`)
                res.send({status:200,responseDB})
            })

            // app.post('/products/add', async(req, res) => {
            //     const personnages = req.body.personnages 
            //     const responseDB = await db.query(
            //         'SELECT franchise FROM products WHERE franchise = "Shang-chi" INSERT INTO franchise (personnages) VALUES (?,?,?)',[personnages])


            // })

        })




app.listen(4000,()=>{})


// curl http://127.0.0.1:4000/categories
// curl -d "name=Old School Games" -X PUT http://127.0.0.1:4000/categories/2
// curl -d "name=Water Games" -X POST  http://127.0.0.1:4000/categories
// curl -X DELETE http://127.0.0.1:4000/categories/4