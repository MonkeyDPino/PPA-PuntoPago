import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const FlightCard = ({ flight }) => {
  const { flightNumber, origin, destination, duration, stops, date } = flight;

  return (
    <Card variant="outlined" sx={{ maxWidth: 400, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h6" align="center">
          Vuelo {flightNumber}
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{ margin: "15px 0" }}
        >
          <Grid item>
            <FlightTakeoffIcon color="primary" />
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {origin}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">→</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="textSecondary">
              {destination}
            </Typography>
          </Grid>
          <Grid item>
            <FlightLandIcon color="secondary" />
          </Grid>
        </Grid>

        <Divider variant="middle" sx={{ margin: "10px 0" }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <AccessTimeIcon />
          <Typography variant="body2">Duración: {duration} horas</Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "10px" }}
        >
          <CalendarTodayIcon />
          <Typography variant="body2">Fecha: {date}</Typography>
        </Stack>

        {stops.length > 0 ? (
          <Stack direction="column" spacing={1} sx={{ marginTop: "10px" }}>
            <Typography variant="body2" color="textSecondary" align="center">
              Escalas:
            </Typography>
            {stops.map((stop, index) => (
              <Chip
                key={index}
                label={stop}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: "10px" }}
          >
            Vuelo directo
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightCard;
