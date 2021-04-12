const config = require('config');
const { server } = require('./configureServer');
const { modelsSynchronizer } = require('./utils/modelsSynchronizer');

const { port } = config;

(async () => {
    try {
        await modelsSynchronizer.syncAll();
        server.listen(port, console.log.bind(null, `[SERVER]: Started on port ${port}!`));
    } catch (e) {
        console.log('[INIT ERROR]:', e);
    }
})()

