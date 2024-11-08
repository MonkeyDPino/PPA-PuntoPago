export function searchFlights(origin, destination, date) {
  return fetch("/flights.json")
    .then((response) => response.json())
    .then((flights) => {
      return flights
        .filter(
          (flight) =>
            flight.origin === origin &&
            flight.destination === destination &&
            flight.date === date
        )
        .sort((a, b) => a.duration - b.duration);
    })
    .catch((error) => {
      console.error("Error searching flights:", error);
      return [];
    });
}
