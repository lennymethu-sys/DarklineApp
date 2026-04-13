const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 🔥 EVENTS (DARKLINE ONLY)
let events = [
  {
    id: 1,
    name: "Darkline Regular",
    description: "Turned up for the after party? Get in and experience the night!",
    price: 800,
    totalTickets: 150,
    sold: 148,
    type: "Individual"
  },
  {
    id: 2,
    name: "Darkline VIP",
    description: "Exclusive access, VIP seating, premium experience.",
    price: 1500,
    totalTickets: 40,
    sold: 40,
    type: "VIP"
  },
  {
    id: 3,
    name: "Darkline Group Pass",
    description: "Entry for a group of 5. Come through with your squad.",
    price: 3500,
    totalTickets: 100,
    sold: 95,
    type: "Group"
  }
];

// 🔥 TEAM
let team = [
  { name: "Ian", role: "Event Organizer" },
  { name: "Saint Vanta", role: "Brand Manager" },
  { name: "Warren", role: "C.E.O" },
  { name: "Maina", role: "Creative Director" },
  { name: "Ashton", role: "Financial Manager" },
  { name: "Clatt", role: "Merchandise Manager" },
  { name: "Lucky", role: "Founder / Developer" }
];

// 🔥 TICKETS
let tickets = [];

// GET EVENTS
app.get('/events', (req, res) => {
  res.json(events);
});

// GET TEAM
app.get('/team', (req, res) => {
  res.json(team);
});

// BOOK TICKET
app.post('/tickets', (req, res) => {
  const { name, eventId } = req.body;

  const event = events.find(e => e.id === eventId);

  if (!event) {
    return res.json({ message: "Event not found ❌" });
  }

  if (event.sold >= event.totalTickets) {
    return res.json({ message: "Sold Out ❌" });
  }

  event.sold++;
  tickets.push({ name, eventId });

  res.json({ message: "Ticket booked successfully ✅" });
});

// GET TICKETS
app.get('/tickets', (req, res) => {
  res.json(tickets);
});

// HOME
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🔥 Darkline server running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'events.html'));
});

app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'team.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});