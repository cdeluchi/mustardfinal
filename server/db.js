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
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
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

module.exports.getRessetCode = (code, email) => {
    console.log("getRessetCode", email);
    const q = `INSERT INTO password_reset_codes (code, email) VALUES($1, $2)`;
    const params = [code, email];
    return db.query(q, params);
};

module.exports.getRessetVerify = (email) => {
    console.log("getRessetVerify", email);
    const params = [email];
    const q = `
    SELECT  code
    FROM password_reset_codes
    WHERE email=$1 
    AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY created_at DESC
    LIMIT 1'`;
    return db.query(q, params);
};

module.exports.updatePass = (email, password) => {
    console.log(email, password);
    const q = `UPDATE users 
            SET password = $2 
            WHERE email= $1 RETURNING id`;

    const params = [email, password];
    return db.query(q, params);
};
// after updat table*******
