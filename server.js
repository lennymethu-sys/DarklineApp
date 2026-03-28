const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Sample Data
let events = [
    { id: 1, name: "Darkline Night 1", date: "April 11th", price: 1000 },
    { id: 2, name: "Darkline VIP", date: "April 11th", price: 3000 }
];

let tickets = [];
let team = [
    { name: "Alice", role: "Marketing Lead" },
    { name: "Bob", role: "Event Manager" }
];

// Routes
app.get('/events', (req, res) => res.json(events));
app.get('/team', (req, res) => res.json(team));
app.post('/tickets', (req, res) => {
    const ticket = req.body; // {name, eventId}
    tickets.push(ticket);
    res.json({ message: "Ticket booked!", ticket });
});
app.get('/tickets', (req, res) => res.json(tickets));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//homepage
app.get('/', (req, res) => {
  res.send('Welcome to Darkline App!');
});