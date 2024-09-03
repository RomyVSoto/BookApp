const Category = require("../models/Categories");
const Book = require("../models/Books");

exports.GetCategoryAdminIndex = (req, res, next) => {
    Category.findAll({
        include: [{
            model: Book,
            as: 'books',
            attributes: ['id']
        }]
    }).then((result) => {
        const categories = result.map((category) => {
            return {
                ...category.dataValues,
                bookCount: category.books.length
            };
        });
        res.render("admin/category-list", {
            pageTitle: "Category Admin",
            cats: categories,
            hasCategories: categories.length > 0,
            IsCategoryList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddCategory = (req, res, next) => {
    res.render("admin/save-category", {
        pageTitle: "Add Category",
        editMode: false,
    });
};

exports.GetEditCategory = (req, res, next) => {
    const id = req.params.categoryId;

    Category.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/admin/categories");
        }

        const category = result.dataValues;

        res.render("admin/save-category", {
            pageTitle: `Edit - ${category?.name} `,
            category: category,
            editMode: true,
        });        
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostAddCategory = (req, res, next) => {
    const name = req.body.Name;
    const description = req.body.Description;
    Category.create({ name: name, description: description }).then(() => {
        res.redirect("/admin/categories");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditCategory = (req, res, next) => {
    const id = req.body.CategoryId;
    const name = req.body.Name;
    const description = req.body.Description;
  
    Category.update(
    {
        name: name,
        description: description,
    }, { 
        where: { id: id } 
    }).then((result) => {
        return res.redirect("/admin/categories");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostCategoryDelete = (req, res, next) => {
    const id = req.body.CategoryId;
  
    Category.destroy({ where: { id } 
    }).then((result) => {
        return res.redirect("/admin/categories");
      }).catch((err) => {
        console.log(err);
      });
  };
  