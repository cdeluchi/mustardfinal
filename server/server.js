const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./bc");
const db = require("./db");
const { uploader } = require("./upload");
const s3Path = "https://s3.amazonaws.com/spicedling/";
const s3 = require("./s3");

// const cryptoRandomString = require("crypto-random-string");
// const ses = require("./ses.js");

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
    // console.log("user.json in get", req.body);
    db.firstUser(req.session.userId).then((result) => {
        // console.log("result", result);
        return res.json({
            userId: req.session.userId,
            // id: result.rows[0].id,
            first: result.rows[0].first,
            last: result.rows[0].last,
            url: result.rows[0].imgurl,
            bio: result.rows[0].bio,
        });
    });
});

//***REGISTRATION ROUTE */
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
                            return res.json({
                                success: true,
                            });
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

//****  LOGIN ROUTE */
app.post("/login.json", (req, res) => {
    db.getRegister(req.body.email).then((result) => {
        // console.log("result in getRegister", result);
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

// ****UPLOAD IMG
// post("/", function (req, res) {
//     console.log("uploadPic in ", req.body);
//     const { userId } = req.body;
//     console.log("req.body :>> ", userId);

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("post in upload", req.file);
    let url = s3Path + req.file.filename;
    if (req.file) {
        db.getImg(url, req.session.userId)
            .then(() => {
                console.log("url", url);
                res.json({ success: true, url: url });
            })
            .catch((err) => {
                console.log("error in upload", err);
            });
    } else {
        res.json({
            success: false,
        });
    }
});

// *** UPDATE BIO

app.get("/user.json", (req, res) => {
    // console.log("log in get user", req.body);
    db.getBio(req.session.userId)
        .then((result) => {
            return res.json({
                userId: req.session.userId,
                first: result.rows[0].first,
                last: result.rows[0].last,
                url: result.rows[0].imgUrl,
                bio: result.rows[0].bio,
            });
        })
        .catch((err) => {
            console.log("error in getBio", err);
            res.redirect("/");
        });
});

// *** GET BIO
app.post("/bio.json", (req, res) => {
    db.updateBio(req.body.draftBio, req.session.userId)
        .then(() => {
            console.log("updateBio");
            res.json({ bioUpdate: true, officialBio: req.body.draftBio });
        })

        .catch((err) => {
            console.log("err in server/bio", err);
        });
});

// *** FIND PEOPLE  ****
app.get("/findPeople", (req, res) => {
    console.log("log in get user");
    db.getFindPeople()
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            console.log("error in initialPeople", err);
            res.sendStatus(500);
        });
});
// FIND matchingPeople
app.get("/matchingPeople/:search", (req, res) => {
    console.log("matching people", req.params);
    db.getMatchingPeople(req.params.search)
        .then((result) => {
            return res.json(result);
        })
        .catch((err) => {
            console.log("error in initialPeople", err);
            res.sendStatus(500);
        });
});

// app.get("/user/:id.json", (req, res) => {
//     console.log("user/:id");
//     db.firstUser(req.result);
//     return res
//         .json({
//             userId: req.session.userId,
//             // id: result.rows[0].id,
//             first: result.rows[0].first,
//             last: result.rows[0].last,
//             url: result.rows[0].imgurl,
//             bio: result.rows[0].bio,
//         })
//         .catch((err) => {
//             console.log("error in initialPeople", err);
//             res.sendStatus(500);
//         });
// });

// *** LOGOUT **
app.get("/logout", (req, res) => {
    req.session.id = null;
    res.redirect("/login");
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

// POST /password/reset/start
// app.post("/password/reset", (req, res) => {
//     console.log("req.body in password/resset", req.body);
//     const email = req.body.email;
//     const password = req.body.password;
//     const updatePass = [];
//     if (req.body.password != "") {
//         hash(req.body.password).then((passHash) => {
//             updatePass.push(db.getAddCode(req.body.password, passHash));
//         });
//     } else {
//         console.log("else in password/reset");
//         updatePass.push(db.updatePass(req.body.password));
//         return res.json({ success: false });
//     }
//     updatePass.push(db.getAddCode(email, password, req.session.user.Id));
// });

// **** POST / SEND CODE
// app.post("/", (req, res) => {
//     console.log("req.body in post send code", req.body);
//     const { email } = req.body;

//     db.getRegister(email)
//         .then((result) => {
//             if (result.rows === 0) {
//                 res.json({ success: false });
//             } else {
//                 const secretCode = cryptoRandomString({
//                     length: 6,
//                 });
//                 console.log("result in getRegister", result);
//                 db.addRegister(email, secretCode);
//                 let email = email;
//                 let subject = "reset the password";
//                 let text = "insert the code";

//                 ses.sentEmail(email, subject, text);
//                 res.json({ success: true });
//             }
//         })
//         .catch(function (err) {
//             console.log("ERROR IN POST LOGIN:>> ", err);
//             res.json({ success: false });
//         });
// });

// *** ROUTE RESET PASSWORD
// app.post("/", (req, res) => {
//     console.log("req.body in reset passw", req.body);
//     const { email, code, password } = req.body;
//     db.getCheckCode(email).then((result) => {
//         console.log("rows in code", result.rows[0].code);
//         if (code == result.rows[0].code) {
//             console.log("the code works");
//             hash(password)
//                 .then((passHash) => {
//                     db.updatePass(email, passHash).then((result) => {
//                         let id = result.rows[0].id;
//                         req.session.userId = id;
//                         req.session.login = true;
//                         res.json({ success: true, userId: id });
//                     });
//                 })
//                 .catch((err) => {
//                     console.log("err in reset pass", err);
//                     res.json({ success: false });
//                 });
//         }
//     });
// });
