const { Router } = require('express')
const cadastroRouter = Router()

const connectDatabase = require('../database/connectDatabase.js')

const { criarUser , buscarUser , hashSenha } = require('../controllers/UserFunctions.js')

connectDatabase()

cadastroRouter.post('/', async (req,res) => {
    try{
      const {username , email , senha } = req.body

      const senhaHashed = await hashSenha(senha)
      
      const user = await buscarUser(email)

      if (user) {
        return res.status(401).json({Error: 'Usuario já possui conta CriticZone'})
      }

      criarUser(username,email, senhaHashed)

      res.status(200).send('Conta CriticZone criada com sucesso')

      
    }catch (err) {
      console.log("Erro ao cadastrar :", err)
      res.status(500).json({Error: `Erro ao cadastrar ${err}`})
    }

})

module.exports = cadastroRouter