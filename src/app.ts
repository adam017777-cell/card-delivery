const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
import type { Request, Response } from "express";

const app = express();

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "\\Login.tsx"));
});

exports.default = app;