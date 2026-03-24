const { hashToken } = require('../controllers/LoginToken.js')
const connectDatabase = require('../database/connectDatabase.js')

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não enviado' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Formato do token inválido' });
    }

    const token = parts[1];
    const tokenHash = hashToken(token);

    const session = await connectDatabase('user_sessions')
      .where({ token_hash: tokenHash })
      .first();

    if (!session) {
      return res.status(401).json({ error: 'Sessão inválida' });
    }

    if (new Date(session.expires_at) < new Date()) {
      await db('user_sessions').where({ id: session.id }).del();
      return res.status(401).json({ error: 'Sessão expirada' });
    }

    const user = await db('users').where({ id: session.user_id }).first();

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao autenticar' });
  }
}