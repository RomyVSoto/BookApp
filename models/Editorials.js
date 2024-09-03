const Sequelize = require("sequelize");
const connection = require("../contexts/AppContext");
const Books = require("../models/Books");

const Editorials = connection.define("editorial", {
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
    telephone: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Editorials;