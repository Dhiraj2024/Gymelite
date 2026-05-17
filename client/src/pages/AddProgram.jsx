// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { programAPI } from "../utils/api";
// import { AuthContext } from "../context/AuthContext";

// const AddProgram = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     title: "",
//     image: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!user?.isAdmin) {
//     return <h1 className="text-center text-red-500">Access Denied</h1>;
//   }

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       await programAPI.create(formData);
//       navigate("/programs");
//     } catch (err) {
//       setError("Failed to add program");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-dark py-20">
//       <div className="max-w-xl mx-auto">
//         <h1 className="text-4xl text-center mb-6">Add Program</h1>

//         {error && <p className="text-red-500">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input name="title" placeholder="Title" onChange={handleChange} className="w-full p-3" required />
//           <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full p-3" required />
//           <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3" required />

//           <button className="btn-neon w-full">
//             {loading ? "Adding..." : "Add Program"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddProgram;
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { programAPI } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const AddProgram = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    duration: "",
    difficulty: "",
    price: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user?.isAdmin) {
    return <h1 className="text-center text-red-500">Access Denied</h1>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await programAPI.create(formData);
      navigate("/programs");
    } catch (err) {
      setError("Failed to add program");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl text-center mb-6">Add Program</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Program Name" onChange={handleChange} className="w-full p-3" required />

          <input name="image" placeholder="Image URL" onChange={handleChange} className="w-full p-3" required />

          <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-3" required />

          <select name="category" onChange={handleChange} className="w-full p-3" required>
            <option value="">Select Category</option>
            <option>Weight Training</option>
            <option>Cardio Training</option>
            <option>Yoga</option>
            <option>Zumba</option>
          </select>

          <input name="duration" placeholder="Duration (e.g. 6 weeks)" onChange={handleChange} className="w-full p-3" />

          <select name="difficulty" onChange={handleChange} className="w-full p-3">
            <option value="">Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <input name="price" type="number" placeholder="Price" onChange={handleChange} className="w-full p-3" />

          <button className="btn-neon w-full">
            {loading ? "Adding..." : "Add Program"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProgram;