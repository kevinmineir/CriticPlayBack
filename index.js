const express = require('express')

const cadastroRouter = require('./Routes/cadastro.js')
const loginRouter = require('./Routes/login.js')

const server = express()
const cors = require("cors")

server.use(cors())
server.use(express.json())

server.use('/Cadastro', cadastroRouter)
server.use('/Login', loginRouter)

const port = process.env.PORT || 3000

server.listen(port,() =>{
    console.log('Server is listening')
})