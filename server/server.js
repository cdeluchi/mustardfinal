const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const db = require("./db");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses.js");

app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

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

app.get("/user/id.json", function (req, res) {
    console.log("client want to know if the user is registred");
    res.json({
        userId: req.session.userId,
    });
    // res.json({ userId: undefined });
});

app.get("/user.json", function (req, res) {
    db.firstUser(req.session.usersId).then((result) => {
        return res.json({
            userId: req.session.userId,
            first: result.rows[0].first,
            last: result.rows[0].last,
        });
    });
    res.redirect("/");
});

app.post("/registration.json", (req, res) => {
    console.log("registration:", req.body);
    hash(req.body.password)
        .then((passHash) => {
            console.log("passHash", passHash);
            return passHash;
        })
        .then((passHash) => {
            if (
                req.body.first &&
                req.body.last &&
                req.body.email &&
                req.body.password
            ) {
                db.addRegister(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    passHash
                )
                    .then(() => {
                        db.getRegister(req.body.email).then((result) => {
                            console.log("server in getRegister");
                            console.log("server in id", result.rows[0].id);
                            req.session.noRegistration = false;
                            req.session.userId = result.rows[0].id;
                            console.log(req.session);
                            res.redirect("/");
                        });
                    })
                    .catch((err) => {
                        console.log("err in getRegister", err);
                        req.session.noRegistration = "email already exists";
                        return res.json({ success: false });
                    });
            } else {
                console.log("registration no complete");
                req.session.noRegistration = "Check again!";
                return res.json({ success: false });
            }
        });
});

//**  LOGIN ROUTE */
app.post("/login.json", (req, res) => {
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

//****DO NOT TOUCH HERE*** */
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

//*** WHEN ERROR IN SERVER */ DO NOT PANIC!!!!
//UnhandledPromiseRejectionWarning: Error: Illegal arguments: undefined, string
// MEANS THAT THE INFO IN INPUT FIELD ARE  NOT VALIABLE
