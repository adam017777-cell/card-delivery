import React from 'react';
import makeCard from './components/form';
const useState = React.useState;
const { Card } = require('./models/cards');

function App() {
  const [cards, setCards] = useState<(typeof Card)[]>([]);

  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('/api/cards', { method: 'GET' });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          setCards(data);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        alert('Failed to fetch cards. Please try again later.');
      }
    fetchCards();
  }}, []);

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Create Card</button>
      { cards.map((card) => (
        <Card key={card._id} card={card} />
      )) }
    {
      showForm && <makeCard onSave={() => {}} onClose={() => setShowForm(false)} />
    }
    </div>
  );
}

export default App;
