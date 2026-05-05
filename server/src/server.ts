const app = require("./app").default;
const env = require("./util/validateEnv");
const mongoose = require("mongoose");

const port = env.PORT;

const uri = env.MONGO_CONNECTION_STRING;

const db = mongoose.createConnection(uri);

db.connect().then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err: Error) => {
    console.error("Error connecting to MongoDB:", err);
});
