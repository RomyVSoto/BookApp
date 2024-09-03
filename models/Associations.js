const Authors = require("../models/Authors");
const Books = require("../models/Books");
const Categories = require("../models/Categories");
const Editorials = require("../models/Editorials");

Books.belongsTo(Categories, { foreignKey: "categoryId", as: "category" });
Categories.hasMany(Books, { foreignKey: "categoryId" });

Books.belongsTo(Authors, { foreignKey: "authorId", as: "author" });
Authors.hasMany(Books, { foreignKey: "authorId" });

Books.belongsTo(Editorials, { foreignKey: "editorialId", as: "editorial" });
Editorials.hasMany(Books, { foreignKey: "editorialId" });

module.exports = {
    Authors,
    Books,
    Categories,
    Editorials
};
