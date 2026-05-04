import type { Request, Response } from "express";
const CardModel =  require('../models/card');

exports.getCards = async (req: Request, res: Response) => {
    const cards = await CardModel.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(cards);
}

exports.createCard = async (req: Request, res: Response) => {
    const { title, content } = req.body;
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
        return res.status(404).json({ error: "Card not found" });
    }
    res.status(200).json(card);
};