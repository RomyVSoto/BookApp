const Editorial = require("../models/Editorials");
const Book = require("../models/Books");

exports.GetEditorialAdminIndex = (req, res, next) => {
    Editorial.findAll({
        include: [{
            model: Book,
            as: 'books',
            attributes: ['id']
        }]
    }).then((result) => {
        const editorials = result.map((editorial) => {
            return {
                ...editorial.dataValues,
                bookCount: editorial.books.length
            };
        });
        res.render("admin/editorial-list", {
            pageTitle: "Editorial Admin",
            edits: editorials,
            hasEditorials: editorials.length > 0,
            IsEditorialList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddEditorial = (req, res, next) => {
    res.render("admin/save-editorial", {
        pageTitle: "Add Editorial",
        editMode: false,
    });
};

exports.GetEditEditorial = (req, res, next) => {
    const id = req.params.editorialId;

    Editorial.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/admin/editorials");
        }

        const editorial = result.dataValues;

        res.render("admin/save-editorial", {
            pageTitle: `Edit - ${editorial?.name} `,
            editorial: editorial,
            editMode: true,
        });        
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostAddEditorial = (req, res, next) => {
    const name = req.body.Name;
    const telephone = req.body.Telephone;
    const country = req.body.Country;
    Editorial.create({ name: name, telephone: telephone, country: country }).then(() => {
        res.redirect("/admin/editorials");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditEditorial = (req, res, next) => {
    const id = req.body.EditorialId;
    const name = req.body.Name;
    const telephone = req.body.telephone;
    const country = req.body.Country;
  
    Editorial.update(
    {
        name: name,
        name: name,
        telephone: telephone,
        country: country,
    }, { 
        where: { id: id } 
    }).then((result) => {
        return res.redirect("/admin/editorials");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditorialDelete = (req, res, next) => {
    const id = req.body.EditorialId;
  
    Editorial.destroy({ where: { id } 
    }).then((result) => {
        return res.redirect("/admin/editorials");
      }).catch((err) => {
        console.log(err);
      });
  };
  