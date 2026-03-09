const connectDatabase = require('../database/connectDatabase.js')

async function deletarUsuario(id){
    try{
         await connectDatabase("users")
        .where({id})
        .delete()

        console.log(`conta id:${id} deletada`)
    }catch(err){
        console.log('Erro ao deletar conta', err)
    }
   
}

module.exports = deletarUsuario