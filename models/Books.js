const Sequelize = require("sequelize");
const connection = require("../contexts/AppContext");

const Books = connection.define("book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: "id",
        },
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'authors',
            key: "id",
        }
    },
    editorialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'editorials',
            key: "id",
        },
    },
});

module.exports = Books;
