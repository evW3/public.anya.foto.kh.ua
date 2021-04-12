const config = require('config');
const { Sequelize, DataTypes } = require('sequelize');

const { login, password, host, port, name } = config.db;

const operators = Sequelize.Op;
let sequelize = new Sequelize(`mysql://${login}:${password}@${host}:${port}/${name}`, { logging: false });

module.exports = { sequelize, ...operators, DataTypes };