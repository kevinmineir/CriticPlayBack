const express = require('express')

const cadastroRouter = require('./Routes/cadastro.js')
const server = express()
const cors = require("cors")

server.use(cors())
server.use(express.json())

server.use('/Cadastro', cadastroRouter)

const port = process.env.PORT || 3000

server.listen(port,() =>{
    console.log('Server is listening')
})