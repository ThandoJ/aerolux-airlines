const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

let bookings = [];

// GET bookings by date
app.get("/api/bookings/:date", (req, res) => {
  const result = bookings.filter(b => b.date === req.params.date);
  res.json(result);
});

// CREATE booking
app.post("/api/bookings", (req, res) => {
  const { name, email, date, seat } = req.body;

  if (!name || !email || !date || !seat) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const conflict = bookings.find(
    b => b.date === date && b.seat === seat
  );

  if (conflict) {
    return res.status(400).json({ message: "Seat already taken" });
  }

  const newBooking = {
    id: uuidv4(),
    name,
    email,
    date,
    seat
  };

  bookings.push(newBooking);
  res.json(newBooking);
});

// DELETE booking
app.delete("/api/bookings/:id", (req, res) => {
  bookings = bookings.filter(b => b.id !== req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
