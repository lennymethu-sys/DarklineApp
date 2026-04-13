const eventsContainer = document.getElementById("events-container");
const teamContainer = document.getElementById("team-container");

// 🔥 LOAD EVENTS
if (eventsContainer) {
  fetch('/events')
    .then(res => res.json())
    .then(events => {
      eventsContainer.innerHTML = '';

      events.forEach(event => {
        const card = document.createElement("div");
        card.classList.add("card");

        let remaining = event.totalTickets - event.sold;

        card.innerHTML = `
          <h3>${event.name}</h3>
          <p>${event.description}</p>
          <p><strong>Ksh ${event.price}</strong></p>
          <p>${event.sold} / ${event.totalTickets} tickets</p>
          <p>Status: ${remaining > 0 ? "Active 🟢" : "Sold Out ❌"}</p>
          <button 
            ${remaining === 0 ? "disabled" : ""} 
            onclick="bookTicket(${event.id})">
            ${remaining === 0 ? "Sold Out" : "Book Ticket"}
          </button>
        `;

        eventsContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading events:", err));
}

// 🔥 LOAD TEAM
if (teamContainer) {
  fetch('/team')
    .then(res => res.json())
    .then(team => {
      teamContainer.innerHTML = '';

      team.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("team-card");

        card.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.role}</p>
        `;

        teamContainer.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading team:", err));
}

// 🔥 BOOK TICKET
function bookTicket(eventId) {
  const name = prompt("Enter your name");

  if (!name) {
    alert("Name is required ❌");
    return;
  }

  fetch('/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, eventId })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      location.reload(); // refresh to update tickets
    })
    .catch(err => console.error("Booking error:", err));
}