import SeatMap from "./SeatMap";

export default function BookingCard({
  date,
  setDate,
  selectedSeat,
  setSelectedSeat,
  name,
  setName,
  email,
  setEmail,
  message,
  bookSeat,
  seats,
  bookedSeats,
  seatClass,         
  setSeatClass,
  time,
  setTime
      
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 -mt-9 relative z-20">
      <div className="bg-white shadow-2xl rounded-2xl p-8">

        {/* Tabs */}
        <div className="flex gap-6 mb-6 text-sm">
          <span className="font-semibold border-b-2 border-black pb-1">
            Return
          </span>
          <span className="text-gray-500">One way</span>
        </div>

        {/* Inputs */}
        <div className="grid md:grid-cols-4 gap-4 mb-4">
          <input placeholder="Departure" className="border p-3 rounded-lg" />
          <input placeholder="Arrival" className="border p-3 rounded-lg" />

          <input
            type="date"
            className="border p-3 rounded-lg"
            onChange={(e) => setDate(e.target.value)}
          />

          <input type="date" className="border p-3 rounded-lg" />
        </div>

        {/* Class + Passenger Row */}
<div className="grid md:grid-cols-2 gap-4 mb-4">
  
  {/* Class Dropdown */}
  <select
    value={seatClass}
    onChange={(e) => setSeatClass(e.target.value)}
    className="border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black"
  >
    <option value="economy">Economy Class</option>
    <option value="premium">Premium Economy</option>
    <option value="business">Business Class</option>
    <option value="first">First Class</option>
  </select>

  {/* Time Slot Dropdown */}
<select
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-black"
>
  <option value="">Select Departure Time</option>
  <option value="06:00">06:00 AM</option>
  <option value="09:00">09:00 AM</option>
  <option value="12:00">12:00 PM</option>
  <option value="15:00">03:00 PM</option>
  <option value="18:00">06:00 PM</option>
  <option value="21:00">09:00 PM</option>
</select>

  {/* Optional Passenger Input */}
  <select className="border p-3 rounded-lg bg-gray-50">
    <option>1 Adult</option>
    <option>2 Adults</option>
    <option>4 Adults</option>
    <option>5 Adults</option>
    <option>6 Adults</option>
    <option>7 Adults</option>
    <option>8 Adults</option>
    <option>9 Adults</option>
  </select>

</div>


       

        {/* Form */}
        {selectedSeat && (
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-lg"
            />
          </div>
        )}

        {message && <p className="text-red-500 mb-3">{message}</p>}

        {/* Button */}
        <button
          onClick={bookSeat}
          className="w-full bg-green-400 hover:bg-gray-500 p-4 rounded-lg font-semibold"
        >
          Confirm Booking
        </button>

      </div>
    </div>
  );
}
