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

module.exports.getRegister = () => {
    return db.query(`SELECT first, last, email, passwordFROM users`);
};

module.exports.addRegister = (first, last, email, password) => {
    console.log("firstName");
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [first, last, email, password]; //
    return db.query(q, params);
};
