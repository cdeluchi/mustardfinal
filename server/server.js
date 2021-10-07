const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash } = require("./bc");
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
                            return res.json({ success: true });
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
    db.getRegister(req.body.email)
        .then((result) => {
            console.log("result in getRegister", result);
            req.session.userId = result.rows[0].id;
            return result.rows[0].passHash;
        })
        .then((password) => {
            db.getRegister(req.body.password, password).then(
                (comparePassword) => {
                    if (comparePassword === true) {
                        return res.json({ success: true });
                    } else {
                        req.session.userId = false;
                        return res.json({ success: false });
                    }
                }
            );
        });
});

// **** POST /password/reset/start
app.post("/password/resset", (req, res) => {
    console.log("req.body in password/resset", req.body);
    const email = req.body.email;
    const password = req.body.password;
    const updatePass = [];
    if (req.body.password != "") {
        hash(req.body.password).then((passHash) => {
            updatePass.push(db.getRessetCode(req.body.password, passHash));
        });
    } else {
        console.log("else in password/resset");
        updatePass.push(db.updatePass(req.body.password));
        return res.json({ success: false });
    }
    updatePass.push(db.getRessetCode(email, password, req.session.user.Id));
});

// **** POST / SEND CODE
app.post("/", (req, res) => {
    console.log("req.body in post send code", req.body);
    const { email } = req.body;

    db.getRegister(email)
        .then((result) => {
            if (result.rows === 0) {
                res.json({ success: false });
            } else {
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                console.log("result in getRegister", result);
                db.addRegister(email, secretCode);
                let email = email;
                let subject = "reset the password";
                let text = "insert the code";

                ses.sentEmail(email, subject, text);
                res.json({ success: true });
            }
        })
        .catch(function (err) {
            console.log("ERROR IN POST LOGIN:>> ", err);
            res.json({ success: false });
        });
});

// *** ROUTE RESET PASSWORD
app.post("/", (req, res) => {
    console.log("req.body in reset passw", req.body);
    const { email, code, password } = req.body;
    db.getRessetVerify(email).then((result) => {
        console.log("rows in code", result.rows[0].code);
        if (code == result.rows[0].code) {
            console.log("the code works");
            hash(password)
                .then((passHash) => {
                    db.updatePass(email, passHash).then((result) => {
                        let id = result.rows[0].id;
                        req.session.userId = id;
                        req.session.login = true;
                        res.json({ success: true, userId: id });
                    });
                })
                .catch((err) => {
                    console.log("err in reset pass", err);
                    res.json({ success: false });
                });
        }
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
