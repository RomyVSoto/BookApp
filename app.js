const port = 8000;

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const { engine } = require("express-handlebars");
const connection = require("./contexts/AppContext");

const errorController = require("./controllers/ErrorController");
const adminRouter = require("./routes/admin");
const bookappRouter = require("./routes/bookapp");

require("./models/Associations");


app.engine("hbs", engine({
    layoutsDir: "views/layouts",
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
        eq: (a, b) => a === b
    }
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/", bookappRouter);
app.use("/", errorController.Get404);

connection.sync().then(result => {
    app.listen(port);
}).catch(err => {
    console.log(err);
})