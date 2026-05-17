// import { useState, useEffect } from "react";
// import { trainerAPI } from "../utils/api";

// const Trainers = () => {
//   const [trainers, setTrainers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrainers = async () => {
//       try {
//         const res = await trainerAPI.getAll();
//         setTrainers(res.data);
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTrainers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-dark py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-5xl font-bold text-center mb-6">
//           <span className="gradient-text">Meet Our Trainers</span>
//         </h1>
//         <p className="text-center text-gray-400 mb-16">Expert professionals ready to guide you</p>

//         {loading ? (
//           <div className="text-center text-gray-400">Loading trainers...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {trainers.map((trainer) => (
//               <div key={trainer._id} className="card-dark text-center group">
//                 <div className="w-40 h-40 mx-auto mb-4 bg-gradient-neon rounded-full flex items-center justify-center text-6xl group-hover:scale-110 transition">
//                   👨‍🏫
//                 </div>
//                 <h3 className="text-2xl font-bold mb-2">{trainer.name}</h3>
//                 <p className="text-primary font-semibold mb-3">{trainer.speciality}</p>
//                 <p className="text-gray-400 text-sm mb-4">{trainer.bio || "Expert trainer with proven track record"}</p>
//                 <p className="text-xs text-gray-500 mb-4">📚 {trainer.certification}</p>
//                 <button className="btn-neon w-full">Book Session</button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Trainers;
import { useState, useEffect } from "react";
import { trainerAPI } from "../utils/api";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await trainerAPI.getAll();
        setTrainers(res.data); // ✅ all trainers from admin
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Meet Our Trainers</span>
        </h1>
        <p className="text-center text-gray-400 mb-16">
          Expert professionals ready to guide you
        </p>

        {loading ? (
          <div className="text-center text-gray-400">Loading trainers...</div>
        ) : trainers.length === 0 ? (
          <div className="text-center text-gray-500">
            No trainers added yet 🚫
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {trainers.map((trainer) => (
              <div
                key={trainer._id}
                className="bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-500 group"
              >
                {/* Image */}
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src={
                      trainer.image ||
                      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1"
                    }
                    alt={trainer.name}
                     className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold mb-1">
                    {trainer.name}
                  </h3>

                  <p className="text-primary text-sm font-semibold mb-2">
                    {trainer.speciality || "Fitness Trainer"}
                  </p>

                  <p className="text-xs text-gray-400 mb-2">
                    🏋️ Program: {trainer.program || "General Fitness"}
                  </p>

                  <p className="text-gray-400 text-xs mb-4">
                    {trainer.bio || "Experienced trainer helping clients achieve fitness goals."}
                  </p>

                  <button className="btn-neon w-full text-sm">
                    Book Session
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

export default Trainers;