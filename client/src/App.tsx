import React from 'react';
import logo from './logo.svg';
const css = require('./App.css');
const useState = React.useState;
const { Card } = require('./models/cards');

function App() {
  const [cards, setCards] = useState<(typeof Card)[]>([]);

  React.useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('http://localhost:5000/api/cards', { method: 'GET' });
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Card Delivery Application. This is the client side of the application. Please refer to the server side for API endpoints and functionality.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
