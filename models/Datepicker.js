const { sequelize, DataTypes } = require('../utils/baseDB');

const Datepicker = sequelize.define('datepicker', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    month: {
        type: DataTypes.INTEGER
    },
    day: {
        type: DataTypes.INTEGER
    },
    year: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { Datepicker };