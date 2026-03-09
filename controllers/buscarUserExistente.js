const connectDatabase = require("../database/connectDatabase.js")

async function buscarUserExistente(email) {
  try{

    const user = await connectDatabase("users")
      .where({ email })
      .first()

    return !!user

  } catch(err) {
    console.log(`falha ao buscar user com email ${email} : `, err)
  }
}

module.exports = buscarUserExistente