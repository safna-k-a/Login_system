const express = require("express");
const body_parser = require("body-parser");
const session = require("express-session");
const noCache = require("nocache");
const { v4: uuidv4 } = require("uuid");
const router = require("./router");
const app = express();
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(
    session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: true,
    })
);
app.use(noCache());
app.use("/route", router);
app.get("/", (req, res) => {
    if (req.session.user) {
        req.session.msg = null;

        res.render("dashboard", {
            user: req.session.user,
            name: req.session.name || "User",
        });
    } else {
        const msg = req.session.msg;
        req.session.msg = null;
        res.render("base", { title: "Login System", msg });
    }
});
app.listen(port, () => {
    console.log("Listening to the server on http://127.0.0.1:8080");
});
