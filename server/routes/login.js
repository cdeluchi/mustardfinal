const express = require("express");
const router = express.Router();
const db = require("./sql/db.js");
const { compare } = require("bcryptjs");

router.use((req, res, next) => {
    next();
});

//**  LOGIN ROUTE */
router.post("/login.json", (req, res) => {
    db.getRegister(req.body.email).then((result) => {
        console.log("result in getRegister", result);
        if (!result.rows[0]) {
            return res.json({ success: false });
        }
        let passwordInDB = result.rows[0].passHash;
        let passwordUserType = req.body.password;

        compare(passwordUserType, passwordInDB)
            .then((comparePassword) => {
                if (comparePassword === true) {
                    req.session.userId = result.rows[0].id;
                    res.redirect("/");
                } else {
                    req.session.userId = false;
                    return res.json({ success: false });
                }
            })
            .catch((err) => {
                console.log("err in login", err);
            });
        // comparePassword;
        // req.session.userId = result.rows[0].id;
    });
});

module.exports = router;
