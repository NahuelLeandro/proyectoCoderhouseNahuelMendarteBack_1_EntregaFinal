const handlebars = require("express-handlebars");

function setupHandlebars(app, paths) {
    app.engine(
        "hbs",
        handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
        })
    );
    app.set("view engine", "hbs");
    app.set("views", paths.views);
}

module.exports = setupHandlebars;