const Book = require("../models/Books");
const Author = require("../models/Authors");
const Category = require("../models/Categories");
const Editorial = require("../models/Editorials");
const transporter = require("../services/EmailService");

exports.GetBookAdminIndex = (req, res, next) => {
    Book.findAll({
        include: [
            { model: Category, as: 'category' },
            { model: Author, as: 'author' },
            { model: Editorial, as: 'editorial'}
        ]
    }).then((result) => {
        const books = result.map(book => book.toJSON());
        res.render("admin/book-list", {
            pageTitle: "Book Admin",
            books: books,
            hasBooks: books.length > 0,
            IsBookList: true,
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.GetAddBook = (req, res, next) => {
    const authorPromise = Author.findAll();
    const categoryPromise = Category.findAll();
    const editorialPromise = Editorial.findAll();

    Promise.all([authorPromise, categoryPromise, editorialPromise]).then(results => {
        const authors = results[0].map(result => result.toJSON());
        const categories = results[1].map(result => result.toJSON());
        const editorials = results[2].map(result => result.toJSON());

        console.log("Authors: ", authors);
        console.log("Categories: ", categories);
        console.log("Editorials: ", editorials);

        res.render("admin/save-book", {
            pageTitle: "Add Book",
            editMode: false,
            authors: authors,
            categories: categories,
            editorials: editorials
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.GetEditBook = (req, res, next) => {
    const id = req.params.bookId;
    const bookPromise = Book.findOne({
        where: { id: id },
        include: [
            { model: Author, as: 'author' },
            { model: Category, as: 'category' },
            { model: Editorial, as: 'editorial' },
        ]
    });
    const authorPromise = Author.findAll();
    const categoryPromise = Category.findAll();
    const editorialPromise = Editorial.findAll();

    Promise.all([bookPromise, authorPromise, categoryPromise, editorialPromise]).then(results => {
        const book = results[0] ? results[0].toJSON() : null;
        const authors = results[1].map(result => result.toJSON());
        const categories = results[2].map(result => result.toJSON());
        const editorials = results[3].map(result => result.toJSON());

        console.log("Book: ", book);
        console.log("Authors: ", authors);
        console.log("Categories: ", categories);
        console.log("Editorials: ", editorials);

        if (!book) {
            return res.redirect("/admin/books");
        }

        res.render("admin/save-book", {
            pageTitle: `Edit - ${book.title}`,
            book: book,
            editMode: true,
            authors: authors,
            categories: categories,
            editorials: editorials
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.PostAddBook = async (req, res, next) => {
    try {
        const { Title: title, Year: year, CategoryId: categoryId, AuthorId: authorId, EditorialId: editorialId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;  // Guardar la ruta completa de la imagen

        const book = await Book.create({
            title: title,
            year: year,
            imageUrl: image,
            categoryId: categoryId,
            authorId: authorId,
            editorialId: editorialId,

            include: [
                { model: Category, as: 'category' },
                { model: Author, as: 'author' },
                { model: Editorial, as: 'editorial' }
            ]
        });

        const author = await Author.findByPk(authorId);
        if (!author) {
            throw new Error("Autor no encontrado");
        }

        await transporter.sendMail({
            from: "Notificación de Libro <no-reply@tu-dominio.com>",
            to: author.email,
            subject: "Nuevo Libro Publicado",
            html: `<p>Hola ${author.name},</p>
                   <p>Tu libro <strong>${book.title}</strong> ha sido publicado en una editorial pública.</p>
                   <p>Que tengas un buen día</p>`
        });

        res.redirect("/admin/books");
    } catch (error) {
        console.error("Error al agregar libro:", error);
        next(error);
    }
};

exports.PostEditBook = async (req, res, next) => {
    try {
        const { BookId: id, Title: title, Year: year, CategoryId: categoryId, AuthorId: authorId, EditorialId: editorialId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const bookData = {
            title: title,
            year: year,
            categoryId: categoryId,
            authorId: authorId,
            editorialId: editorialId
        };

        if (image) {
            bookData.imageUrl = image;
        }

        await Book.update(bookData, { where: { id: id } });

        res.redirect("/admin/books");
    } catch (error) {
        console.error("Error al editar libro:", error);
        next(error);
    }
};

exports.PostBookDelete = (req, res, next) => {
    const id = req.body.BookId;

    Book.destroy({ where: { id } }).then((result) => {
        return res.redirect("/admin/books");
    }).catch((err) => {
        console.log(err);
    });
};
