import type { Request, Response } from "express";
import createHttpError = require("http-errors");
const CardModel =  require('../models/card');

exports.getCards = async (req: Request, res: Response) => {
    const cards = await CardModel.find().sort({ createdAt: -1 }).exec();
    
    res.status(200).json(cards);
}

exports.createCard = async (req: Request, res: Response) => {
    type title  = string | undefined;
    type content  = string | undefined;

    const { title , content } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    const newCard = new CardModel({ title, content });
    await newCard.save();
    //or CardModel.create({ title, content });
    res.status(201).json(newCard);
}

exports.getCardById = async (req: Request, res: Response) => {
    const id  = req.params.id;

    const card = await CardModel.findById(id).exec();
    
    if (!card) {
        throw createHttpError(404, "Card not found");
    }

    res.status(200).json(card);
};

exports.deleteCardById = async (req: Request, res: Response) => {
    const id  = req.params.id;

    const card = await CardModel.findById(id).exec();

    if (!card) {
        throw createHttpError(404, "Card not found");
    }
    await card.remove();

    res.status(204).json({ message: "Card deleted successfully" });
};