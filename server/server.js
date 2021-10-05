const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash } = require("./bc");
const db = require("./db");

app.use(compression());
app.use(express.json());

//**COOKIE SESSION */
let secrets;
process.env.NODE_ENV === "production"
    ? (secrets = process.env)
    : (secrets = require("./secrets"));

app.use(
    cookieSession({
        secret: `${secrets.cookieSecret}`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", function (req, res) {
    console.log("client want to know if the user is registred");
    res.json({
        userId: req.session.userId,
    });
    // res.json({ userId: undefined });
});

// app.get("/registration.json", (req, res) => {
//     console.log("req.session", req.session);
//     if (req.session.signature) {
//         res.redirect("/registration");
//     } else {
//         res.render("registration");
//     }
// });

app.post("/registration.json", (req, res) => {
    console.log("registration:", req.body);
    hash(req.body.password)
        .then((passHash) => {
            console.log("passHash", passHash);
            return db.addRegister(
                req.body.first,
                req.body.last,
                req.body.email,
                passHash
            );
        })
        .then(({ rows }) => {
            console.log("get Register in rows", rows);
            req.session.userId = rows[0].Id;
            res.json({ success: true });
            res.redirect("/");
        })
        .catch(() => {
            res.json({ success: false });
            console.log("err in catch json");
            res.render("/registration");
        });
});

//**  LOGIN ROUTE */

//****DO NOT TOUCH HERE*** */
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
