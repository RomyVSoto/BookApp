const Book = require("../models/Books");
const Author = require("../models/Authors");
const Category = require("../models/Categories");
const Editorial = require("../models/Editorials");

//Books

exports.GetBookIndex = (req, res, next) => {
    Promise.all([
      Book.findAll({
        include: [
          { model: Author, as: 'author' },
          { model: Category, as: 'category' },
          { model: Editorial, as: 'editorial' }
        ]
      }),
      Author.findAll(),
      Category.findAll(),
      Editorial.findAll()
    ])
    .then(([books, authors, categories, editorials]) => {
      res.render("bookapp/index", {
        pageTitle: "BookApp",
        books: books.map(book => book.toJSON()),
        hasBooks: books.length > 0,
        auths: authors.map(author => author.toJSON()),
        categories: categories.map(category=> category.toJSON()),
        editorials: editorials.map(editorial => editorial.toJSON()),
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  exports.GetBook = (req, res, next) => {
    const id = req.params.bookId;
  
    Book.findOne({
      where: { id: id },
      include: [
        { model: Author, as: 'author' },
        { model: Category, as: 'category' },
        { model: Editorial, as: 'editorial' }
      ]
    })
    .then((result) => {
      if (!result) {
        return res.redirect("/");
      }
  
      const book = result.toJSON();
      console.log("Libro encontrado:", book);
      res.render("bookapp/book-detail", {
        pageTitle: `Book - ${book.name}`,
        book: book,
        hasBook: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };


//Authors

exports.GetAuthorIndex = (req, res, next) => {
    Author.findAll()
      .then((result) => {
        const authors = result.map((result) => result.dataValues);
        res.render("bookapp/index", {
          pageTitle: "BookApp",
          auths: authors,
          hasAuthors: authors.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetAuthor = (req, res, next) => {
    const id = req.params.authorId;
  
    Author.findOne({ where: { id: id } })
      .then((result) => {
  
         if (!result) {
           return res.redirect("/");
         }
  
        const author = result.dataValues;  
  
        res.render("bookapp/author-detail", {
          pageTitle: `Author - ${author?.name}`,
          author: author,
          hasAuthors: author ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


//Categories

exports.GetCategoryIndex = (req, res, next) => {
    Category.findAll()
      .then((result) => {
        const categories = result.map((result) => result.dataValues);
        res.render("bookapp/index", {
          pageTitle: "BookApp",
          cats: categories,
          hasCategories: categories.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetCategory = (req, res, next) => {
    const id = req.params.categoryId;
  
    Category.findOne({ where: { id: id } })
      .then((result) => {
  
         if (!result) {
           return res.redirect("/");
         }
  
        const category = result.dataValues;  
  
        res.render("bookapp/category-detail", {
          pageTitle: `Category - ${category?.name}`,
          category: category,
          hasCategories: category ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


//Editorials

exports.GetEditorialIndex = (req, res, next) => {
    Editorial.findAll()
      .then((result) => {
        const editorials = result.map((result) => result.dataValues);
        res.render("bookapp/index", {
          pageTitle: "BookApp",
          edits: editorials,
          hasEditorials: editorials.length > 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  exports.GetEditorial = (req, res, next) => {
    const id = req.params.editorialId;
  
    Editorial.findOne({ where: { id: id } })
      .then((result) => {
  
         if (!result) {
           return res.redirect("/");
         }
  
        const editorial = result.dataValues;  
  
        res.render("bookapp/editorial-detail", {
          pageTitle: `Editorial - ${editorial?.name}`,
          editorial: editorial,
          hasEditorial: editorial ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



//Search

  exports.Search = async (req, res, next) => {
    try {
      const search = req.query.search.toLowerCase();
  
      const books = await Book.findAll({
        include: [
          { model: Author, as: 'author' },
          { model: Category, as: 'category' },
          { model: Editorial, as: 'editorial' }
        ]
      });
      const filteredBooks = books.filter(book => book.title.toLowerCase().includes(search));
  
      res.render('bookapp/index', {
        pageTitle: 'BookApp - Search',
        books: filteredBooks.map(book => book.toJSON()),
        hasBooks: filteredBooks.length > 0,
        search: search
      });
    } catch (error) {
      next(error);
    }
  };


//Filter

exports.Filter = async (req, res, next) => {
  try {
    const categoryId = req.query.categoryId;

    const books = await Book.findAll({
      where: { categoryId: categoryId },
      include: [
        { model: Author, as: 'author' },
        { model: Category, as: 'category' },
        { model: Editorial, as: 'editorial' }
      ]
    });

    const categories = await Category.findAll();

    res.render('bookapp/index', {
      pageTitle: 'BookApp - Filter',
      books: books.map(book => book.toJSON()),
      hasBooks: books.length > 0,
      categories: categories.map(category => category.toJSON()),
      selectedCategory: categoryId
    });
  } catch (error) {
    next(error);
  }
};