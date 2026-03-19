const { Router } = require('express')
const loginRouter = Router()
const bcrypt = require('bcrypt')

const connectDatabase = require('../database/connectDatabase.js')

const { buscarUser } = require('../controllers/UserFunctions.js')
const { gerarToken , hashToken} = require('../controllers/LoginToken.js')

connectDatabase()

loginRouter.post('/',async (req, res) =>{
    try{

    const {email,senha} = req.body
    
    const user = await buscarUser(email)

    if (!user) {
        return res.status(401).json({Error: 'Credenciais Invalidas'})
    }

    const senhaOk = await bcrypt.compare(senha, user.senha)

    if (!senhaOk) {
        return res.status(401).json({Error: 'Credenciais Invalidas'})
    }

    const token = gerarToken()
    const tokenHashed = hashToken(token)

    const validade = new Date();
    validade.setDate(validade.getDate() + 15)  // validade de 15 dias para o token

    await knex('user_tokens').insert({
        user_id: user.id ,
        token_hash: tokenHashed ,
        expira_em: validade
    })

    return res.status(200).json({
        message: 'Login realiado com sucesso', token ,
        user: {
            id: user.id,
            email: user.senha,
            name: user.username

        }
    })
    

    } catch(err) {
        res.status(500).json({Error: `Erro ao fazer login ${err}`})
    }
})

module.exports = loginRouter