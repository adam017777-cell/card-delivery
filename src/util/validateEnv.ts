const { cleanEnv } = require("envalid");
const { str, port } = require("envalid/dist/validators");

module.exports = cleanEnv(process.env, {
    MONGO_CONNECTION_STRING: str(),
    PORT: port(),
});
