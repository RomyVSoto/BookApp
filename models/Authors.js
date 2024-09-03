const Sequelize = require("sequelize");
const connection = require("../contexts/AppContext");

const Books = require("../models/Books");

const Authors = connection.define("author", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Authors;