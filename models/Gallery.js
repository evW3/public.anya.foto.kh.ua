const { sequelize, DataTypes } = require('../utils/baseDB');

const Gallery = sequelize.define('gallery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    photoSessionName: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    main: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: false,
    alter: true
});

module.exports = { Gallery };