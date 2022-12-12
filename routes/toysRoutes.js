const toysRoutes = (app, db) => {
    app.get('/toys', async (req, res) => {
        try {
            responseDB = await db.query(`SELECT * FROM toys`)
            res.send(responseDB)
        } catch {
            res.sendStatus(404)
        }

    })
    app.get('/toys/:id', async (req, res) => {
        const id = req.params.id
        responseDB = await db.query(`SELECT * FROM toys WHERE id = '${id}'`)
        if (responseDB == undefined) {
            res.sendStatus(404)
        } else {
            res.send(responseDB)
        }
    })
    // curl http://127.0.0.1:4000/toys/5

    app.post('/toys', async (req, res) => {
        const id = req.params.id
        const name = req.body.name
        const description = req.body.description
        const price = req.body.price
        const category = req.body.category
        const responseDB = await db.query('INSERT INTO toys (id, name, description, price, category) VALUES (?,?,?,?,?)', 
        [id, name, description, price, category])
        res.send({ status: 200, responseDB })
    })
     // curl -d "name=Minesweeper&description=Home computer classic&price=0&category=1" -X POST http://127.0.0.1:4000/toys
    
    app.put('/toys/:id', async (req, res) => {
        const id = req.params.id
        const name = req.body.name
        responseDB = await db.query(`UPDATE toys SET name=? WHERE id = '${id}'`, [name])
        res.send({ status: 200, responseDB })
    })
    // curl -d "name=Checkers" -X PUT http://127.0.0.1:4000/toys/5

    app.delete('/toys/:id', async (req, res) => {
        const id = req.params.id
        responseDB = await db.query(`DELETE FROM toys WHERE id = '${id}'`)
        res.send({ status: 200, responseDB })
    })
    // curl -X DELETE http://127.0.0.1:4000/toys/5
}

module.exports = toysRoutes;