const { sequelize } = require('./baseDB');

class ModelsSynchronizer {
	async #checkConnection() {
		await sequelize.authenticate();
		console.log('[DB]: Connection to DB has been established successfully!');
	}

	async #log({ models }) {
		Object.keys(models).forEach(modelName => console.log(`[DB]: Model "${modelName}" were synchronized!`));
	}

	async syncAll() {
		await this.#checkConnection();
		await sequelize.sync();
		await this.#log(sequelize);
	}
}

module.exports = {
	modelsSynchronizer: new ModelsSynchronizer()
};