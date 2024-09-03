const Author = require("../models/Authors");
const Book = require("../models/Books");

exports.GetAuthorAdminIndex = (req, res, next) => {
    Author.findAll({
        include: [{
            model: Book,
            as: 'books',
            attributes: ['id']
        }]
    }).then((result) => {
        const authors = result.map((author) => {
            return {
                ...author.dataValues,
                bookCount: author.books.length
            };
        });
        res.render("admin/author-list", {
            pageTitle: "Author Admin",
            auths: authors,
            hasAuthors: authors.length > 0,
            IsAuthorList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddAuthor = (req, res, next) => {
    res.render("admin/save-author", {
        pageTitle: "Add Author",
        editMode: false,
    });
};

exports.GetEditAuthor = (req, res, next) => {
    const id = req.params.authorId;

    Author.findOne({ where: { id: id } }).then((result) => {
        if (!result) {
            return res.redirect("/admin/authors");
        }

        const author = result.dataValues;

        res.render("admin/save-author", {
            pageTitle: `Edit - ${author?.name} `,
            author: author,
            editMode: true,
        });        
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostAddAuthor = (req, res, next) => {
    const name = req.body.Name;
    const email = req.body.Email;
    Author.create({ name: name, email: email }).then(() => {
        res.redirect("/admin/authors");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostEditAuthor = (req, res, next) => {
    const id = req.body.AuthorId;
    const name = req.body.Name;
    const email = req.body.Email;
    const bookId = req.body.BookId;
  
    Author.update(
    {
        name: name,
        email: email,
        bookId: bookId,
    }, { 
        where: { id: id } 
    }).then((result) => {
        return res.redirect("/admin/authors");
    }).catch((err) => {
        console.log(err);
    });
};

exports.PostAuthorDelete = (req, res, next) => {
    const id = req.body.AuthorId;
  
    Author.destroy({ where: { id } 
    }).then((result) => {
        return res.redirect("/admin/authors");
      }).catch((err) => {
        console.log(err);
      });
  };
  