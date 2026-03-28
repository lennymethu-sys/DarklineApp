const eventsContainer = document.getElementById("events-container");
const teamContainer = document.getElementById("team-container");

// Fetch and display events
fetch('http://localhost:3000/events')
  .then(res => res.json())
  .then(events => {
    eventsContainer.innerHTML = '';
    events.forEach(event => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${event.name}</h3>
        <p>Date: ${event.date}</p>
        <p>Price: KSH ${event.price}</p>
        <button onclick="bookTicket(${event.id})">Book Ticket</button>
      `;
      eventsContainer.appendChild(card);
    });
  });

// Fetch and display team
fetch('http://localhost:3000/team')
  .then(res => res.json())
  .then(team => {
    teamContainer.innerHTML = '';
    team.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("team-card");
      card.innerHTML = `
        <h4>${member.name}</h4>
        <p>${member.role}</p>
      `;
      teamContainer.appendChild(card);
    });
  });

// Book ticket function
function bookTicket(eventId) {
  const name = prompt("Enter your name to book this ticket");
  if (!name) return alert("Name is required!");

  fetch('http://localhost:3000/tickets', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ name, eventId })
  })
  .then(res => res.json())
  .then(data => alert(data.message));
}