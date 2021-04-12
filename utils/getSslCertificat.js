const path = require('path');
const fs = require('fs');

const serverOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '..', 'config', 'ssl-certification', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '..', 'config', 'ssl-certification', 'cert.pem'))
};

module.exports = {
	serverOptions
};
