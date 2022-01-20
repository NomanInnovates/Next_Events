export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-by-nomi-default-rtdb.firebaseio.com/events.json"
  );
  console.log("response", response);
  const data = await response.json();
  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }
  return events;
}

export async function getFeaturedEvents() {
  let allEvents = await getAllEvents();

  return allEvents?.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  let allEvents = await getAllEvents();

  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  let allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
