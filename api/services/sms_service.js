const secrets = require("../util/secrets");

// create random 6 digit OTP
const _OTP = Math.floor(100000 + Math.random() * 900000);
const client = require("twilio")(
  secrets.TWOFACTOR_ACCOUNT_ID,
  secrets.TWOFACTOR_AUTH_TOKEN
);

module.exports = {
  verifySms() {
    client.messages
      .create({
        body: "Your verification code is: " + _OTP,
        from: secrets.TWOFACTOR_SOURCE_NUMBER,
        to: secrets.TWOFACTOR_DESTINATION_NUMBER
      })
      .then(message => console.log(message.sid));
  }
};
