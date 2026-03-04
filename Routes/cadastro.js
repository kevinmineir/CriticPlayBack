const { Router } = require('express')
const cadastroRouter = Router()

const { MongoCliente, ServerApiVersion } = require("mongodb")

cadastroRouter.post('/',(req,res) => {
    const { username , email , senha } = req.body



    res.send('funcionou')
})

module.exports = cadastroRouter