const { Router } = require('express')
const cadastroRouter = Router()

const connectDatabase = require('../database/connectDatabase.js')

const { criarUser , buscarUser , hashSenha } = require('../controllers/UserFunctions.js')
const { gerarToken, hashToken } = require('../controllers/LoginToken.js')

connectDatabase()

cadastroRouter.post('/', async (req,res) => {
    try{
      const {username , email , senha } = req.body

      const senhaHashed = await hashSenha(senha)
      
      const user = await buscarUser(email)

      if (user) {
        return res.status(401).json({Error: 'Email já possui conta CriticZone'})
      }

      const novoUserId = await criarUser(username,email, senhaHashed)

      const token = gerarToken()
      const tokenHashed = hashToken(token)

      const validade = new Date()
      validade.setDate(validade.getDate() + 15)

      await connectDatabase('user_tokens').insert({
        user_id: novoUserId ,
        token_hash: tokenHashed,
        expira_em: validade
      }
      )

      res.status(200).send('Conta CriticZone criada com sucesso')

      
    }catch (err) {
      console.log("Erro ao cadastrar :", err)
      res.status(500).json({Error: `Erro ao cadastrar ${err}`})
    }

})

module.exports = cadastroRouter