const connectDatabase = require('../database/connectDatabase.js')
const bcrypt = require('bcrypt')

async function alterarNomeUser(id) {
    try{

        await connectDatabase("users")
            .where({id})
            .update({username})

    } catch(err) {
        console.log('erro ao alterar nome de Usuário:', err)
    }
}

async function alterarSenhaUser(id) {
    try{
        await connectDatabase("users")
            .where({id})
            .update({senha})
    }catch(err){
        console.log(`erro ao alterar senha do usuario ${id} `, err)
    }
}

async function criarUser(username,email,senha) {
  try{
    
    const user = await connectDatabase("users").insert({
      username,
      email,
      senha
    })

    console.log('Usuário criado')

    const id = user[0].toString();

    return id // retorna o ID no banco

  } catch(err) {
    console.log("Erro ao criar usuário:", err)
  }
}

async function deletarUser(id){
    try{
         await connectDatabase("users")
        .where({email})
        .delete()

        console.log(`conta id:${id} deletada`)
    }catch(err){
        console.log('Erro ao deletar conta', err)
    }
   
}

async function buscarUser(email) {
  try{

    const user = await connectDatabase("users")
      .where({ email })
      .first()

    return user

  } catch(err) {
    console.log(`falha ao buscar user`, err)
  }
}

async function hashSenha(senha) {  // Transforma a senha em hash
  const saltRounds = 10
  const hash = await bcrypt.hash(senha, saltRounds);
  return hash
}


module.exports = {criarUser , deletarUser , alterarSenhaUser ,alterarNomeUser , buscarUser , hashSenha}