import React from 'react';
import Button from 'react-bootstrap/esm/Button';
const MakeCard = require('./components/form').default;
const useState = React.useState;
const CardModel = require('./models/cards').Card;
const api = require('./network/cards_api');
const styles = require('./styles/global.css');
const Card = require('./components/Card').default;


function App() {
  const [cards, setCards] = useState<(typeof CardModel)[]>([]);

  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    async function fetchCards() {
      try {
        const response = await api.GetCards();
        setCards(response);
      } catch (error) {
        console.error('Error fetching cards:', error);
        alert('Failed to fetch cards. Please try again later.');
      }
    }
    fetchCards();
  }, []);

  async function deleteCard(id: string) {
    try {
      const response = await api.DeleteCard(id, { method: 'DELETE' });
      setCards(cards.filter((card) => card._id !== id));
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Failed to delete card. Please try again later.');
    }
  };
  return (
    <div>
      <Button onClick={() => setShowForm(true)}>Create Card</Button>
      { cards.map((card) => (
        <Card key={card._id} card={card} onDelete = {deleteCard} />
      )) }
    {
      showForm && <MakeCard onSave={() => {}} onClose={() => setShowForm(false)}/>
    }
    </div>
  );
}

export default App;
