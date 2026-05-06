
import { Card as BootstrapCard } from 'react-bootstrap';
import { ProcessImage } from '../network/image_api';
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
                <button className="btn btn-secondary" onClick={async (e: React.MouseEvent<HTMLButtonElement>) => { await ProcessImage(card._id); e.stopPropagation(); alert('Image processing started. You will receive an email when it is complete.'); }}>Send Email</button>
                <BootstrapCard.Text>{card.content}</BootstrapCard.Text>
            </BootstrapCard.Body>
            <BootstrapCard.Footer className="text-muted">
               Created at: {new Date(card.createdAt).toLocaleString('en-CA', { dateStyle: 'short', timeStyle: 'short' })}
            </BootstrapCard.Footer>
        </BootstrapCard>
    );
};

export default Card;