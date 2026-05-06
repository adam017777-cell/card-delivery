import html2canvas from 'html2canvas';
import sgMail from '@sendgrid/mail';
const style = require('styles/card.css');

export async function ProcessImage(id: string, options?: RequestInit) {
    const response = await fetch(`/api/cards/${id}`, { method: 'GET' })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const cardData = await response.json();
    const cardElement = document.createElement('div');
    cardElement.style = style.card;
    cardElement.innerHTML = `
        <h1>${cardData.title}</h1>
        <p>${cardData.content}</p>
    `;
    document.body.appendChild(cardElement);
    const canvas = await html2canvas(cardElement);
    document.body.removeChild(cardElement);
    const dataUrl = canvas.toDataURL('image/png');

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    const msg = {
        to: 'adamsl017777@gmail.com',
        from: 'adamsl017777@gmail.com',
        subject: 'Your Card Image',
        text: 'Please find your card image attached.',
        attachments: [
            {
                content: dataUrl.split(',')[1],
                filename: `card_${id}.png`,
                type: 'image/png',
                disposition: 'attachment',
            },
        ],
    };
    await sgMail.send(msg);
}
