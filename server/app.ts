const express = require("express");
const session = require("express-session");
const cors = require("cors");
const {v4: uuidv5} = require("uuid");
const mongoose = require("mongoose");
const path = require("path");
import type { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(cors());


app.use(express.static(__dirname));

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
)

app.use(express.urlencoded({ extended: false}))
app.use(express.json());

const uri = 'mongodb://localhost:27017/cardDeliveryDB';

const db = mongoose.createConnection(uri);


db.connect().then(() => {
    console.log("Connected to MongoDB");
}).catch((err: Error) => {
    console.error("Error connecting to MongoDB:", err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "\\Homepage.html"))
})
