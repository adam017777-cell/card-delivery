import { Form, Modal } from 'react-bootstrap';
import { Card } from '../models/cards';
import { useForm } from 'react-hook-form/dist/useForm';
import { CardMake } from '../network/cards_api';
const api = require('../network/cards_api');

interface formProps {
    onSave: (card: Card) => void;
    onClose: () => void;
}

const makeCard = ({ onSave, onClose }: formProps) => {
    const { register, handleSubmit, formState : { errors, isSubmitting } } = useForm<Card>();

    async function onFormSubmit(data: CardMake) {
        try {
            const response = await api.CreateCard(data);
            onSave(response);
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
       <Modal show={true} onHide={onClose}>
         <Modal.Header closeButton>
           <Modal.Title>Create Card</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form id="addCardForm" onSubmit={handleSubmit(onFormSubmit)}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" isInvalid={!!errors.title} {...register('title', { required: true })} />
                    <Form.Control.Feedback type="invalid">{errors.title && <Form.Text className="text-danger">Title is required</Form.Text>}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter content (optional)" {...register('content')} />
                </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
                <button disabled={isSubmitting} form='addCardForm' type="submit" className="btn btn-primary">
                    Submit
                </button>
         </Modal.Footer>
       </Modal>
    );
}

export default makeCard;