const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const { hash } = require("./bc");
const bc = require("./bc.js");
const db = require("./db");
const { uploader } = require("./upload");
const s3Path = "https://s3.amazonaws.com/spicedling/";
const s3 = require("./s3");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

//try to use routes MIDDLEWARE
//if you want to deploy to Heroku need to change this localhost too
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client", "public")));

//**COOKIE SESSION */
// let secrets;
// process.env.NODE_ENV === "production"
//     ? (secrets = process.env)
//     : (secrets = require("./secrets"));

// app.use(
//     cookieSession({
//         secret: `${secrets.cookieSecret}`,
//         maxAge: 1000 * 60 * 60 * 24 * 14,
//         sameSite: true,
//     })
// );
// if need to have the secret for deploy this
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.get("/user/id.json", function (req, res) {
    // console.log("client want to know if the user is registred");
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
        console.log("result in getRegister", result);
        if (!result.rows[0]) {
            return res.json({ success: false });
        }
        let passwordInDB = result.rows[0].passHash;
        let passwordUserType = req.body.password;

        bc.compare(passwordUserType, passwordInDB)
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
    // console.log("log in get user");
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

// OTHER USERS

app.get("/api/users/:userId", (req, res) => {
    // console.log("req profile for users ", req.params.userId);
    if (req.params.userId === req.session.userId) {
        res.redirect("/");
    }
    db.getBio(req.params.userId)
        .then((result) => {
            return res.json({
                userId: req.session.userId,
                first: result.rows[0].first,
                last: result.rows[0].last,
                url: result.rows[0].imgurl,
                bio: result.rows[0].bio,
            });
        })
        .catch((err) => {
            console.log("error in user/id", err);
            res.sendStatus(500);
        });
});

// as a result when the DB is updated, the btn text should reflect this new status by changin its text

// ROUTE MAKE FRIENDSHIP
app.get("/getfriendship/:otherUserId", (req, res) => {
    // console.log("req profile for users ");
    const params = req.params.otherUserId;
    const session = req.session.userId;
    console.log("getfriendship params", params);
    console.log("getfriendship session", session);
    db.getfriendship(params, session)
        .then((results) => {
            console.log("result in getfriendship", results.rows.sender_id);
            res.json(results.rows);
        })
        .catch((err) => {
            console.log("error in get/friendship", err);
            // return res.json({ accepted: "undefined" });
        });
});
// ROUTE SET FRIENDSHIP
app.post("/setFriendship", (req, res) => {
    // console.log("POST getfriendship");
    // console.log("accepted in POST Friendship", req.body);
    // console.log("req.session in POST Friendship", req.session);
    const bodyAccep = req.body.buttonText; //
    const otherUser = req.body.otherUserId; //
    const sessionUser = req.session.userId; //
    let accepted;
    //criar if else aqui mesmo para que quando o btn for clicado ele deve mandar uma mensagem pro bot˜åo para alterar o texto
    if (bodyAccep === "add Friend") {
        // console.log("req.body.userId", req.body.userId);
        accepted = false;
        db.setFriendship(sessionUser, otherUser, bodyAccep)
            .then(() => {
                return res.json({ buttonText: "cancel Friend" });
            })
            .catch((err) => {
                console.log("error in get/friendship", err);
                return res.sendStatus(500);
            });
    } else if (bodyAccep === "ended Friend") {
        db.updateFriendship(sessionUser, otherUser, bodyAccep)
            .then(() => {
                return res.json({ buttonText: "add Friend" });
            })
            .catch((err) => {
                console.log("error in get/friendship", err);
                return res.sendStatus(500);
            });
    } else if (bodyAccep === "cancel Friend" || bodyAccep == "ended Friend") {
        db.cancelFriendship(sessionUser, otherUser)
            .then(() => {
                return res.json({ buttonText: "add Friend" });
            })
            .catch((err) => {
                console.log("error in get/friendship", err);
                return res.sendStatus(500);
            });
    }
});

// GET FRIENDSHIPs
app.get("/friends.json", (req, res) => {
    console.log("GET/friends in SERVER", req.session);
    const session = req.session.userId;
    console.log("friends session", session);
    db.alreadyFriends(session)
        .then((accepted) => {
            console.log("accepted in GETfriends", accepted.rows);
            if (!session) {
                res.json({ success: false });
            } else {
                res.json(accepted);
            }
        })
        .catch((err) => {
            console.log("error in get/friendship", err);
        });
});

app.post("/unfriend", (req, res) => {
    console.log("unfriend in SERVER");
    db.cancelFriendship(req.session.userId, req.body.other)
        .then(() => {
            console.log("resp in unfriend SERVER", res.rows);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in post unfriend", err);
            return res.sendStatus(500);
        });
});
app.post("/acceptedFriend", (req, res) => {
    console.log("body", req.body);
    console.log("acceptedFriend in SERVER");
    db.updateFriendship(req.session.userId, req.body.other, true)
        .then(() => {
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("error in post unfriend", err);
            return res.sendStatus(500);
        });
});

// *** LOGOUT **
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

//****DO NOT TOUCH HERE*** */
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

// SOCKET IO   ROUTE
// USE ASYNC IF WE CAN ******
io.on("connection", async (socket) => {
    console.log(`socket user with Id ${socket.id} just add`);
    const userId = socket.request.session.userId;
    if (!userId) {
        return socket.disconnect(true);
        // if user makes it to this point in the code, then it means they're logged in
    }
    // use async if we can *******
    db.lastTenMsg(userId)
        .then((data) => {
            console.log("lastTenMsg in SERVER", data.rows);
            io.emit("latestTenMsgs", data.rows.reverse());
        })
        .catch((err) => {
            console.log("error in lastTenMsg SocketIo", err);
        });
    // ADDING A NEW MSG - let's listen for a new chat msg being sent from the client });
    socket.on("chatMessage", (data) => {
        console.log("This message is coming in from chat.js component: ", data);
        console.log(`user who sent the newMsg is ${userId}`);
        db.addNewMessage(userId, data).then(({ rows }) => {
            console.log("addNewMessage in SERVER");
            io.emit("newMsg", rows[0]);
        });
    });
});

// & are successfully connected to sockets

// this is a good place to go get the last 10 chat messages
// we'll need to make a new table for chats
// your db query for getting the last 10 messages will need to be a JOIN
// you'll need info from both the users table and chats!
// i.e. user's first name, last name, image, and chat msg
// the most recent chat message should be displayed at the BOTTOM

// 1. do a db query to store the new chat message into the chat table!!
// 2. also do a db query to get info about the user (first name, last name, img) - will probably need to be a JOIN
// once you have your chat object, you'll want to EMIT it to EVERYONE so they can see it immediately.

// 1st arg - ('my new chat message') - listens to the event that will be coming from chat.js
// 2nd arg - (newMsg) - is the info that comes along with the emit from chat.js

//*** WHEN ERROR IN SERVER */ DO NOT PANIC!!!!
//UnhandledPromiseRejectionWarning: Error: Illegal arguments: undefined, string
// MEANS THAT THE INFO IN INPUT FIELD ARE  NOT VALIABLE
