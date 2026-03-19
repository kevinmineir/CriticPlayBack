const crypto = require('crypto')

function gerarToken() {
    return crypto.randomBytes(32).toString('hex')
}

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex')
}

module.exports = {gerarToken , hashToken}