import { motion } from "framer-motion";

export default function SeatMap({
  seats =[],
  bookedSeats =[],
  selectedSeat,
  setSelectedSeat
}) {
  const getColor = (cls) => {
    if (cls === "first") return "bg-gray-500";
    if (cls === "business") return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="grid grid-cols-4 gap-3 mt-6">
      {seats?.map((s) => {
        const booked = bookedSeats.includes(s.id);

        return (
          <motion.button
            key={s.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={booked}
            onClick={() => setSelectedSeat(s.id)}
            className={`p-3 text-white rounded ${
              booked ? "bg-red-500" : getColor(s.class)
            } ${selectedSeat === s.id ? "ring-4 ring-black" : ""}`}
          >
            {s.id}
          </motion.button>
        );
      })}
    </div>
  );
}