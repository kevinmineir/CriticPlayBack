const connectDatabase = require('../database/connectDatabase.js')

async function criarUser(username,email,senha) {
  try{
    
    await connectDatabase("users").insert({
      username,
      email,
      senha
    })

    console.log('Usuário criado')

  } catch(err) {
    console.log("Erro ao criar usuário:", err)
  }
}

module.exports = criarUser