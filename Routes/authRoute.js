const { Router } = require('express')
const AuthRouter = Router()

const verifyAuth = require('../middlewares/VerifyAuth.js')

AuthRouter.get('/', verifyAuth ,(req,res)=>{
    res.status(200).json({
        ok: true
    })
})

module.exports = AuthRouter