
import { Card as BootstrapCard } from 'react-bootstrap';
const styles = require('./styles/card.css');
const CardModel = require('./models/cards').Card;

interface CardProps {
    card: typeof CardModel;
};

const Card = ({ card }: CardProps) => {

    return (
        <BootstrapCard className={styles.card}>
            <BootstrapCard.Body>
                <BootstrapCard.Title>{card.title}</BootstrapCard.Title>
                <BootstrapCard.Text>{card.content}</BootstrapCard.Text>
            </BootstrapCard.Body>
            <BootstrapCard.Footer className="text-muted">
               Created at: {new Date(card.createdAt).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' })}
            </BootstrapCard.Footer>
        </BootstrapCard>
    );
};

export default Card;