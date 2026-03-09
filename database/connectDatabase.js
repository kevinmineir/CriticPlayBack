const knex = require('knex')
const config = require("../knexfile.js")

const connectDatabase = knex(config.development)

module.exports = connectDatabase