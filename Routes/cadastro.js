const { Router } = require('express')
const cadastroRouter = Router()

const connectDatabase = require('../database/connectDatabase.js')

const criarUser = require('../controllers/criarUser.js')
const buscarUserExistente = require('../controllers/buscarUserExistente.js')

connectDatabase()

cadastroRouter.post('/',(req,res) => {
    try{
      const {username , email , senha } = req.body

      if (buscarUserExistente(email)) {
        console.log('Email ja possui conta CriticPlay')
        return
      }

      criarUser(username,email,senha)

      res.send('funcionou')
    }catch (err) {
      console.log("Erro ao cadastrar :", err)
    }

})

module.exports = cadastroRouter