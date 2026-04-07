import { useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BookingCard from "./components/BookingCard";
import SeatMap from "./components/SeatMap";
import BookingsList from "./components/BookingsList";

export default function App() {
  const [date, setDate] = useState("");
  const [seatClass, setSeatClass] = useState("economy");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [message, setMessage] = useState("");

  const seats = [
    { id: "1A", class: "first" },
    { id: "1B", class: "first" },
    { id: "2A", class: "business" },
    { id: "2B", class: "business" },
    { id: "3A", class: "economy" },
    { id: "3B", class: "economy" }
  ];

  // FETCH bookings
  const fetchBookings = async () => {
      if (!date) {
      setMessage("Please select a date first");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/bookings/${date}`
      );

      setBookings(res.data);
      setBookedSeats(res.data.map(b => b.seat));
      setMessage("");
    } catch (err) {
      setMessage("Failed to load bookings");
    }
  };


   /* ========================
     CREATE BOOKING
  ======================== */
  const bookSeat = async () => {
    if (!name || !email || !date || !selectedSeat) {
      setMessage("Please fill all fields and select a seat");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          name,
          email,
          date,
          seat: selectedSeat,
          seatClass
        }
      );

      setBookings([...bookings, res.data]);
      setBookedSeats([...bookedSeats, selectedSeat]);

      // Reset form
      setMessage("Booking successful ✈️");
      setName("");
      setEmail("");
      setSelectedSeat(null);

    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };


    /* ========================
     DELETE BOOKING
  ======================== */
  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);

      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      setBookedSeats(updated.map(b => b.seat));
    } catch (err) {
      setMessage("Failed to delete booking");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Hero />

      <BookingCard
        date={date}
        setDate={setDate}
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        message={message}
        bookSeat={bookSeat}
        seats={seats}
        bookedSeats={bookedSeats}
        seatClass={seatClass}
        setSeatClass={setSeatClass}
      />

      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={fetchBookings}
          className="bg-blue-600 text-white p-2 rounded mb-4"
        >
          Load Seats
        </button>

        <SeatMap
          seats={seats}
          bookedSeats={bookedSeats}
          selectedSeat={selectedSeat}
          setSelectedSeat={setSelectedSeat}
        />

        {selectedSeat && (
          <div className="mt-4">
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={bookSeat}
              className="bg-green-600 text-white w-full p-2"
            >
              Confirm Booking
            </button>
          </div>
        )}

        <BookingsList
          bookings={bookings}
          deleteBooking={deleteBooking}
        />
      </div>
    </div>
  );
}