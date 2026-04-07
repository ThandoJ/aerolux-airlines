export default function BookingList({ bookings, deleteBooking }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl">Bookings</h2>

      {bookings.map((b) => (
        <div
          key={b.id}
          className="flex justify-between bg-gray-800 text-white p-3 mt-2 rounded"
        >
          <span>
            {b.seat} - {b.name} ({b.seatClass})
          </span>

          <button
            onClick={() => deleteBooking(b.id)}
            className="text-red-400"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}