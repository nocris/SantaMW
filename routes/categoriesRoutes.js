const categoriesRoutes = (app, db) => {           
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
        }

module.exports = categoriesRoutes;