const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
import type { Request, Response, NextFunction } from "express";
import createHttpError = require("http-errors");
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

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Not Found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error fetching cards:", err);
    let statusCode = 500;
    let message = "Internal Server Error";
    if (createHttpError.isHttpError(err)) {
        statusCode = err.status;
        message = err.message;
    }
        if (err instanceof Error) {
            res.status(statusCode).json({ error: message });
        }
});


module.exports = app;