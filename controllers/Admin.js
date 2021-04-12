const token = require('../middleware/Token');
const sha256 = require('crypto-js/sha256');
const config = require('config');

const accessCode = config.admin.access;

class AdminController {
    async signIn(req, res) {
        const { code } = req.body;
        const encryptedCode = sha256(code).toString();
        if(encryptedCode === accessCode) {
            res.status(200).json({ token: await token.create(encryptedCode) });
        } else {
            //need logic here => [SIMPLE DDOS DEFENDER]
            res.status(403).json({ message: "incorrect code" });
        }
    }

    async isValidToken(_, res) {
        res.status(200).json({ message: 'valid' });
    }
}

module.exports = { AdminController: new AdminController() }