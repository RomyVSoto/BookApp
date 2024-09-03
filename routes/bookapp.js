const express = require("express");

const router = express.Router();
const bookappController = require("../controllers/BookAppController");

router.get("/", bookappController.GetBookIndex);
router.get("/authors", bookappController.GetAuthorIndex);
router.get("/categories", bookappController.GetCategoryIndex);
router.get("/editorials", bookappController.GetEditorialIndex);
router.get("/book-detail/:bookId", bookappController.GetBook);
router.get("/search", bookappController.Search);
router.get("/filter", bookappController.Filter);

module.exports = router;