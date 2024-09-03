exports.AdminPage = (req, res, next) => {
    res.render("admin/admin-page", {
        pageTitle: "Admin Page",
    });
}