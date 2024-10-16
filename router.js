var express = require("express");
var router = express.Router();
const credential = {
    email: "admin@gmail.com",
    password: "admin123",
    name: "Admin",
};

router.post("/login", (req, res) => {
    if (
        req.body.email == credential.email &&
        req.body.password == credential.password
    ) {
        req.session.user = req.body.email;
        req.session.name = credential.name;
        res.redirect("/route/dashboard");
    } else {
        req.session.msg = "Invalid username or password";
        return res.redirect("/");
    }
});
router.get("/dashboard", (req, res) => {
    if (req.session.user) {
        req.session.msg = null;
        res.render("dashboard", {
            user: req.session.user,
            name: req.session.name,
        });
    } else {
        return res.redirect("/");
    }
});
router.get("/logout", (req, res) => {
    req.session.msg = "Successfully logged out";

    req.session.destroy((err) => {
        if (err) {
            console.error("Failed to destroy session:", err);
            return res.redirect("/");
        }

        res.redirect("/");
    });
});
module.exports = router;
