const connectDatabase = require('../database/connectDatabase.js')

async function alterarNomeUsuario(id) {
    try{

        await connectDatabase("users")
            .where({id})
            .update({username})

    } catch(err) {
        console.log('erro ao alterar nome de Usuário:', err)
    }
}

module.exports = alterarNomeUsuario