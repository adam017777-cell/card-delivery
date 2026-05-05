
import { Card as BootstrapCard } from 'react-bootstrap';
const MdDelete = require('react-icons/md').MdDelete;
const styles = require('./styles/card.css');
const CardModel = require('./models/cards').Card;

interface CardProps {
    onDelete: ((id: string) => void) | undefined;
    card: typeof CardModel;
};

const Card = ({ card, onDelete }: CardProps) => {

    return (
        <BootstrapCard className="card">
            <BootstrapCard.Body>
                <BootstrapCard.Title>{card.title}</BootstrapCard.Title>
                <MdDelete id="delete-icon" className={styles.deleteIcon} onClick={(e: React.MouseEvent<HTMLDivElement>) => onDelete && onDelete(card._id) && e.stopPropagation()} />
                <BootstrapCard.Text>{card.content}</BootstrapCard.Text>
            </BootstrapCard.Body>
            <BootstrapCard.Footer className="text-muted">
               Created at: {new Date(card.createdAt).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' })}
            </BootstrapCard.Footer>
        </BootstrapCard>
    );
};

export default Card;