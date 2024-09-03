const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const adminController = require("../controllers/AdminController");
const authorAdminController = require("../controllers/AuthorAdminController");
const bookAdminController = require("../controllers/BookAdminController");
const categoryAdminController = require("../controllers/CategoryAdminController");
const editorialAdminController = require("../controllers/EditorialAdminController");

router.get("/admin-page", adminController.AdminPage);


//Books

router.get("/books", bookAdminController.GetBookAdminIndex);
router.get("/add-book", bookAdminController.GetAddBook);
router.get("/edit-book/:bookId", bookAdminController.GetEditBook);
router.post("/add-book", upload.single('image'), bookAdminController.PostAddBook);
router.post("/edit-book", upload.single('image'), bookAdminController.PostEditBook);
router.post("/book-delete", bookAdminController.PostBookDelete);


//Authors

router.get("/authors", authorAdminController.GetAuthorAdminIndex);
router.get("/add-author", authorAdminController.GetAddAuthor);
router.get("/edit-author/:authorId", authorAdminController.GetEditAuthor);
router.post("/add-author", authorAdminController.PostAddAuthor);
router.post("/edit-author", authorAdminController.PostEditAuthor);
router.post("/author-delete", authorAdminController.PostAuthorDelete);


//Categories

router.get("/categories", categoryAdminController.GetCategoryAdminIndex);
router.get("/add-category", categoryAdminController.GetAddCategory);
router.get("/edit-category/:categoryId", categoryAdminController.GetEditCategory);
router.post("/add-category", categoryAdminController.PostAddCategory);
router.post("/edit-category", categoryAdminController.PostEditCategory);
router.post("/category-delete", categoryAdminController.PostCategoryDelete);


//Editorials

router.get("/editorials", editorialAdminController.GetEditorialAdminIndex);
router.get("/add-editorial", editorialAdminController.GetAddEditorial);
router.get("/edit-editorial/:editorialId", editorialAdminController.GetEditEditorial);
router.post("/add-editorial", editorialAdminController.PostAddEditorial);
router.post("/edit-editorial", editorialAdminController.PostEditEditorial);
router.post("/editorial-delete", editorialAdminController.PostEditorialDelete);

module.exports = router;
