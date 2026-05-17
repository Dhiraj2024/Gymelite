import { useState,useEffect,useContext } from "react";
import { programAPI } from "../utils/api";
import { FaHeart, FaStar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { user } = useContext(AuthContext);

  const categories = ["All", "Weight Training", "Cardio Training", "Personal Training", "Yoga", "Zumba", "Wrestling", "Pullups", "Weightlifting", "Armwrestling"];

useEffect(() => {
  const fetchPrograms = async () => {
    try {
      const res = await programAPI.getAll();
      setPrograms(res.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchPrograms();
}, []);

  const filteredPrograms = selectedCategory === "All" 
    ? programs 
    : programs.filter(p => p.category === selectedCategory);

  const handleLike = async (id) => {
    try {
      if (!user) {
        alert("Please login to like programs");
        return;
      }
      await programAPI.like(id);
      const res = await programAPI.getAll();
      setPrograms(res.data);
    } catch (error) {
      console.error("Error liking program:", error);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Fitness Programs</span>
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">Choose your path to transformation</p>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 flex-wrap mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? "bg-primary text-dark"
                  : "bg-dark-tertiary text-gray-300 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="text-center text-gray-400">Loading programs...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <div key={program._id} className="card-dark group overflow-hidden">
                {/* Program Image */}
                {/* <div className="h-48 bg-gradient-neon rounded-lg mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition">
                  💪
                </div> */}
<img
  src={program.image}
  alt={program.name}
  className="h-48 w-full object-cover rounded-lg mb-4"
/>
                {/* Program Info */}
                <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
                <p className="text-primary font-semibold mb-2">{program.category}</p>
                <p className="text-gray-400 text-sm mb-4">{program.description}</p>

                {/* Duration & Difficulty */}
                <div className="flex gap-4 mb-4 text-sm">
                  <span className="bg-dark-tertiary px-3 py-1 rounded">📅 {program.duration}</span>
                  <span className="bg-dark-tertiary px-3 py-1 rounded">⚡ {program.difficulty}</span>
                </div>

                {/* Rating & Likes */}
                <div className="flex gap-6 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    {/* <span>{program.rating.toFixed(1)} ({program.rating})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaHeart />
                    <span>{program.likes}</span> */}
                    <span>
  {program.rating ? program.rating.toFixed(1) : "0.0"} ({program.likes})
</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleLike(program._id)}
                    className="flex-1 bg-dark-tertiary hover:bg-accent text-primary hover:text-dark py-2 rounded-lg font-medium transition"
                  >
                    ❤️ Like
                  </button>
                  <button className="flex-1 btn-neon">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
