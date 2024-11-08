import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { searchFlights } from "../../../utils/searchFlights";

const airports = [
  { label: "Bogotá", value: "BOG" },
  { label: "Medellín - José María Córdova", value: "MDE" },
  { label: "Barranquilla", value: "BAQ" },
  { label: "Bucaramanga", value: "BGA" },
  { label: "Santa Marta", value: "SMR" },
  { label: "Cartagena", value: "CTG" },
  { label: "Cali", value: "CLO" },
  { label: "Medellín - Enrique Olaya Herrera", value: "EOH" },
];

const SearchBar = ({ setFlights, resetFlights }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    if (!origin || !destination || !date) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }
    // Aquí puedes manejar la lógica de búsqueda de vuelos
    console.log(
      "Buscando vuelo de:",
      origin,
      "a:",
      destination,
      "en la fecha:",
      date ? date.format("YYYY-MM-DD") : "No seleccionada"
    );
    searchFlights(
      origin.value,
      destination.value,
      date.format("YYYY-MM-DD")
    ).then((flights) => {
      console.log("Vuelos encontrados:", flights);
      setFlights(flights);
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url('/airport-terminal.jpg')",
        backgroundSize: "cover",
        backgroundPositionY: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          padding: "10px",
          maxWidth: "800px",
          margin: "0px auto",
          backgroundColor: "white",
          border: "2px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            style={{
              padding: "20px",
            }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                style={{ marginBottom: "20px" }}
              >
                Busca tu próximo vuelo
              </Typography>
            </Grid>

            {/* Error de llenar todos los campos */}
            {showError && (
              <Grid item xs={12}>
                <Typography variant="body1" color="error">
                  Por favor llena todos los campos
                </Typography>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                value={origin}
                onChange={(event, newValue) => {
                  setOrigin(newValue);
                }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                options={airports}
                renderInput={(params) => (
                  <TextField {...params} label="Origen" variant="standard" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                value={destination}
                onChange={(event, newValue) => {
                  setDestination(newValue);
                }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue);
                // }}
                id="controllable-states-demo"
                options={airports}
                renderInput={(params) => (
                  <TextField {...params} label="Destino" variant="standard" />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <div
                style={{
                  marginLeft: "30px",
                }}
              >
                <DatePicker
                  label="Fecha del Vuelo"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
              </div>
            </Grid>

            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
              >
                Buscar Vuelo
              </Button>
              <Button
                variant="contained"
                color="info"
                onClick={resetFlights}
                style={{ marginLeft: "10px" }}
              >
                Limpiar
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default SearchBar;
