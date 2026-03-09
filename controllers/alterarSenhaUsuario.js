const connectDatabase = require("../database/connectDatabase.js")

async function alterarSenhaUsuario(id) {
    try{
        await connectDatabase("users")
            .where({id})
            .update({senha})
    }catch(err){
        console.log(`erro ao alterar senha do usuario ${id} `, err)
    }
}

module.exports = alterarSenhaUsuario