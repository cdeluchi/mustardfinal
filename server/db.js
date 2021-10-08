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

module.exports.getRegister = (loginMail) => {
    const params = [loginMail];
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
module.exports.getBio = (id, bio) => {
    console.log("userId in getBio", id);
    const params = [id, bio];
    const q = `
    UPDATE users
    SET bio = $2
    WHERE id= $1 
    RETURNING id
    `;
    return db.query(q, params);
};

// Get Image URL Profile Pic
module.exports.getImg = (url, id) => {
    console.log("getImg db", id);
    const params = [url, id];
    const q = `
    UPDATE users 
    SET imgUrl = $1
    WHERE id = $2
    `;
    return db.query(q, params);
};
