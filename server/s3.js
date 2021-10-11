const aws = require("aws-sdk");
const fs = require("fs");

// the code below is not strictly necessary we're not deploying this
// project but IF you want in the future this is already set up
let secrets;
if (process.env.NODE_ENV) {
    secrets = process.env;
} else {
    secrets = require("./secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    console.log("req.body");
    if (!req.file) {
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();
    promise
        .then(() => {
            console.log("******It worked!******");
            next();
            fs.unlink(path, () => {
                console.log(
                    "check if that image is still in the uploads folder."
                );
            });
        })
        .catch((err) => {
            console.log("err in the cloud", err);
        });
};
