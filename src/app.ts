const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
import type { Request, Response, NextFunction } from "express";
const cardsRoutes = require("./routes/cards");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname));

app.use(cors());
app.use("/api/cards", cardsRoutes);

app.use(express.static(__dirname));

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error fetching cards:", err);
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
});


exports.default = app;