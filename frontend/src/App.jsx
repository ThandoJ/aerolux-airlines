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
  const [time, setTime] = useState("");

  const seats = [
    { id: "1A", class: "first" },
    { id: "1B", class: "first" },
    { id: "1C", class: "first" },
    { id: "1D", class: "first" },
    { id: "1E", class: "first" },
    { id: "1F", class: "first" },
    { id: "2A", class: "business" },
    { id: "2B", class: "business" },
    { id: "2C", class: "business" },
    { id: "2D", class: "business" },
    { id: "2E", class: "business" },
    { id: "2F", class: "business" },
    { id: "2G", class: "business" },
    { id: "3A", class: "economy" },
    { id: "3B", class: "economy" },
    { id: "3C", class: "economy" },
    { id: "3D", class: "economy" },
    { id: "3E", class: "economy" },
    { id: "3F", class: "economy" },
    { id: "3G", class: "economy" },
    { id: "3H", class: "economy" }
  ];

  // FETCH bookings
  const fetchBookings = async () => {
      if (!date) {
      setMessage("Please select a date first");
      return;
    }

    try {
      const res = await axios.get(
        `https://aerolux-airlines.onrender.com/api/bookings/${date}`
      );

      setBookings(res.data);
      setBookedSeats(res.data.map(b => b.seat));
      setMessage("");
    } catch (err) {
      setMessage("Failed to load bookings");
    }
  };

// ADDED UPDATE FUNCTION
  const updateBooking = async (id) => {
  const booking = bookings.find(b => b.id === id);
  const newName = prompt("Enter new name:", booking.name);
  const newTime = prompt("Enter new time (e.g. 12:00):", booking.time);

  if (!newName || !newTime) return;

  try {
    const res = await axios.put(
      `https://aerolux-airlines.onrender.com/api/bookings/${id}`,
      {
        name: newName,
        time: newTime,
        date: booking.date,
        seat: booking.seat
      }
    );

    setBookings(
      bookings.map((b) => (b.id === id ? res.data : b))
    );

    setMessage("Booking updated ✈️");

  } catch (err) {
    setMessage(err.response?.data?.message || "Update failed");
  }
};


   /* ========================
     CREATE BOOKING
  ======================== */
  const bookSeat = async () => {
    if (!name || !email || !date || !selectedSeat || !time) {
      setMessage("Please fill all fields and select a seat");
      return;
    }

    try {
      const res = await axios.post(
        "https://aerolux-airlines.onrender.com/api/bookings",
        {
          name,
          email,
          date,
          seat: selectedSeat,
          seatClass,
          time
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
      await axios.delete(`https://aerolux-airlines.onrender.com/api/bookings/${id}`);

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
        time={time} 
        setTime={setTime}
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

        
        

        <BookingsList
          bookings={bookings}
          deleteBooking={deleteBooking}
          updateBooking={updateBooking}
        />
      </div>
    </div>
  );
}