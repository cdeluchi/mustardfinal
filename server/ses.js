const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

ses.sendEmail({
    Source: "Funky Chicken <funky.chicken@spiced.academy>", //use the spiced email
    Destination: {
        ToAddresses: ["disco.duck@spiced.academy"],
    },
    Message: {
        Body: {
            Text: {
                Data: "we know that this forgetting passwords issues is not pleasant. But we do what we can. Use this code and reset your password.",
            },
        },
        Subject: {
            Data: "White Flocke Services Password Assistence",
        },
    },
})
    .promise()
    .then(() => console.log("it worked!"))
    .catch((err) => console.log(err));
