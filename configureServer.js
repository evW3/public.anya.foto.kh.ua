const cors = require('cors');
const path = require('path');
const express = require('express');
const { serverOptions } = require('./utils/getSslCertificat');

const defaultRoutes = require('./providers/root');

const app = express();

let server = require('http').Server(app);
if(process.env.NODE_ENV === 'production') {
    app.listen(80);
    server = require('https').createServer(serverOptions, app);
    app.use((req, res, next) => {
        (req.secure && req?.headers?.host?.startsWith('anya')) ? next() : res.status(301).redirect(`https://anya.foto.kh.ua${req.url}`)
    });

}

app.use(cors());
app.use(express.json({ extender: true }));

app.use('/api', defaultRoutes);
app.use('/api/*', (_, res) => res.status(404).json({ message: 'route not found' }));
app.use('/uploads', express.static(__dirname + '/uploads'));

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'dist')));
    app.use('/admin', express.static(path.join(__dirname, 'client', 'dist')));
    app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
}

module.exports = { server };