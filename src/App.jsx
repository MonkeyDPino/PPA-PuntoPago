import { useEffect, useState } from "react";
import "./App.css";
import Header from "./app/layout/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchBar from "./app/components/SearchBar/SearchBar";
import FlightCard from "./app/components/FlightCard/FlightCard";
import { Grid2, Typography } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#54caf9",
      main: "#0091d6",
      dark: "#005fa0",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  const [flights, setFlights] = useState(null);
  const [originFlights, setOriginFlights] = useState(null);

  useEffect(() => {
    // get 20 flights from the server
    fetch("/flights.json")
      .then((res) => res.json())
      .then((data) => setOriginFlights(data.slice(0, 20)))
      .catch((error) => console.error("Error fetching flights:", error));
  }, []);

  const resetFlights = () => {
    setFlights(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SearchBar setFlights={setFlights} resetFlights={resetFlights} />
      {!flights && !originFlights && (
        <Typography
          variant="h5"
          align="center"
          sx={{ mt: 5, color: "text.secondary" }}
        >
          No hay vuelos disponibles
        </Typography>
      )}
      {originFlights && !flights && (
        <Typography
          variant="h5"
          align="center"
          sx={{ mt: 5, color: "text.secondary" }}
        >
          Vuelos disponibles
        </Typography>
      )}
      <Grid2 container spacing={2} justifyContent="center">
        {flights &&
          flights.map((flight) => (
            <Grid2 item xs={12} md={6} key={flight.flightNumber}>
              <FlightCard key={flight.flightNumber} flight={flight} />
            </Grid2>
          ))}
        {originFlights && !flights && (
          <>
            {originFlights.map((flight) => (
              <Grid2 item xs={12} md={6} key={flight.flightNumber}>
                <FlightCard key={flight.flightNumber} flight={flight} />
              </Grid2>
            ))}
          </>
        )}
      </Grid2>
    </ThemeProvider>
  );
}

export default App;
