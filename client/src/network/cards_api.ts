const { Card } = require('../models/cards');

export interface CardMake {
    title: string;
    content?: string;
}

export async function CreateCard(card: CardMake): Promise<typeof Card> {
    const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}