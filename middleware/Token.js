const jwt = require('jsonwebtoken');
const config = require('config');

const secretKey = config.token.secretKey;
const expiresIn = config.token.expiresIn;

const codeAccess = config.admin.access

class AuthToken {
    async create(code) {
        return await jwt.sign({ code }, secretKey, { expiresIn });
    }

    async verify(req, res, next) {
        if(req?.headers?.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const { code } = await jwt.verify(token, secretKey);
                if(code === codeAccess) {
                    next();
                } else {
                    res.status(403).json({ message: '[ERROR]: incorrect code' });
                }
            } catch (e) {
                res.status(402).json({ message: '[ERROR]: incorrect token' });
            }
        } else {
            res.status(402).json({ message: '[ERROR]: incorrect token' });
        }
    }
}

module.exports = new AuthToken();