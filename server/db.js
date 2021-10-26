const spicedPg = require("spiced-pg");
const database = "socialnw";

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUserName, dbPassword } = require("./secrets.json");
    db = spicedPg(
        `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
    );
}

module.exports.firstUser = (id) => {
    console.log("firstUser in db", id);
    return db.query(
        `
    SELECT * 
    FROM users 
    WHERE id = $1`,
        [id]
    );
};

module.exports.loginId = (email) => {
    return db.query(
        `
    SELECT password, id 
    FROM users 
    WHERE email = $1`,
        [email]
    );
};

module.exports.addRegister = (first, last, email, password) => {
    console.log("firstName");
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [first, last, email, password]; //
    return db.query(q, params);
};

module.exports.getRegister = (email) => {
    const params = [email];
    const q = `
    SELECT id, password
    FROM users
    WHERE email=$1
     `;
    return db.query(q, params);
};

module.exports.getAddCode = (code, email) => {
    console.log("getRessetCode", email);
    const q = `
    INSERT INTO password_reset_codes (code, email) 
    VALUES($1, $2)`;
    const params = [code, email];
    return db.query(q, params);
};

module.exports.getCheckCode = (email) => {
    console.log("getRessetVerify", email);
    const params = [email];
    const q = `
    SELECT  code
    FROM password_reset_codes
    WHERE email=$1 
    AND CURRENT_TIMESTAMP - created_at 
    < INTERVAL '10 minutes'
    ORDER BY created_at DESC
    LIMIT 1'`;
    return db.query(q, params);
};

module.exports.updatePass = (email, password) => {
    console.log("updatePass", email, password);
    const q = `UPDATE users 
            SET password = $2 
            WHERE email= $1 
            RETURNING id`;
    const params = [email, password];
    return db.query(q, params);
};
// after updat table*******

//  Get Bio
module.exports.getBio = (userId) => {
    // console.log("userId in getBio", userId);
    const params = [userId];
    const q = `
    SELECT first, last, imgUrl, bio
    FROM users
    WHERE id=$1
     `;
    return db.query(q, params);
};

// ** UPDATE BIO
module.exports.updateBio = (bio, userId) => {
    console.log("userId in updateBio", userId);
    const params = [bio, userId];
    const q = `
    UPDATE users
    SET bio = $1
    WHERE id= $2
    RETURNING id
    `;
    return db.query(q, params);
};

// Get Image URL Profile Pic
module.exports.getImg = (url, userId) => {
    console.log("getImg db", userId);
    const params = [url, userId];
    const q = `
    UPDATE users 
    SET imgUrl = $1
    WHERE Id = $2
    RETURNING imgUrl
    `;
    return db.query(q, params);
};

module.exports.getMatchingPeople = (search) => {
    // console.log("getFindPeople", search);
    const params = [search + "%"];
    const q = `
    SELECT first, last, id, imgurl  
    FROM users 
    WHERE first 
    ILIKE $1`;
    return db.query(q, params);
};

module.exports.getfriendship = (otherUserId, userId) => {
    console.log("getFriendship", otherUserId, userId);
    const params = [otherUserId, userId];
    const q = `
    SELECT * 
    FROM friendships
    WHERE (recipient_id = $1 AND sender_id = $2)
    OR (recipient_id = $2 AND sender_id = $1)
    `;
    return db.query(q, params);
};

module.exports.setFriendship = (otherUserId, userId) => {
    console.log("setFriendship in DB", otherUserId, userId);
    const params = [otherUserId, userId];
    const q = `
        INSERT INTO friendships
        (sender_id, recipient_id)
        VALUES ($1, $2)
    `;
    return db.query(q, params);
};

module.exports.updateFriendship = (userId, otherUserId, accepted) => {
    console.log("updateFriendship in DB", otherUserId, userId, accepted);
    const params = [otherUserId, userId, accepted];
    const q = `
        UPDATE friendships
        SET accepted = $3
        WHERE (sender_id = $1 AND recipient_id= $2 )
    `;
    return db.query(q, params);
};

module.exports.cancelFriendship = (otherUserId, userId) => {
    console.log("cancelFriedship in DB", otherUserId, userId);
    const params = [otherUserId, userId];
    const q = `
    DELETE FROM friendships 
    WHERE (sender_id = $1 AND recipient_id = $2) 
    OR (sender_id = $2 AND recipient_id = $1)`;
    return db.query(q, params);
};

module.exports.alreadyFriends = (userId) => {
    console.log("alreadyFriends in db", userId);
    const params = [userId];
    const q = `
    SELECT users.id, first, last, imgurl, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)
`;
    return db.query(q, params);
};

// CHAT add message and get the lastest message sended
// add message
module.exports.addNewMessage = (sender_id, message) => {
    // console.log("addMessage in db", sender_id, message);
    const params = [sender_id, message];
    const q = `
    INSERT INTO messages
    (sender_id, message)
    VALUES ($1, $2) 
    RETURNING *
`;
    return db.query(q, params);
};
// lastest message
module.exports.lastTenMsg = () => {
    // console.log("lastTenMsg in db");
    const q = `
    SELECT messages.id, sender_id, imgurl, message, first, last, messages.created_at
    FROM messages
    JOIN users
    ON sender_id = users.id
    ORDER BY messages.id DESC
    LIMIT 10
`;
    return db.query(q);
};
module.exports.getFindPeople = () => {
    // console.log("getFindPeople");
    const q = `
    SELECT first, last, id, imgurl FROM users
    ORDER BY id DESC
    LIMIT 18
    `;
    return db.query(q);
};

module.exports.getEvent = () => {
    console.log("getEvent inDB");
    const q = `
    SELECT place, events, id, event_date, event_time FROM events
    ORDER BY id DESC
    LIMIT 3
    `;
    return db.query(q);
};
// async function createPlace({ name, geoJSON }) {
//     const result = await db.query(
//         "INSERT INTO places (name, geoJSON) VALUES($1, ($2)::jsonb) RETURNING *",
//         [name, JSON.stringify(geoJSON)]
//     );
//     return result.rows[0];
// }
