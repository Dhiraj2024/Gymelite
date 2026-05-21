// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import API from "../utils/api";
// import AdminWhatsappSettings from './AdminWhatsappSettings';

// const AdminDashboard = () => {
//   // Get tab from URL parameter if provided
//   const searchParams = new URLSearchParams(window.location.search);
//   const initialTab = searchParams.get("tab") || "overview";
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(initialTab);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [bookings, setBookings] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [usersList, setUsersList] = useState([]);
//   const [trainers, setTrainers] = useState([]);
//   const [loadingBookings, setLoadingBookings] = useState(false);
//   const [loadingContacts, setLoadingContacts] = useState(false);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [loadingTrainers, setLoadingTrainers] = useState(false);
// const [whatsappNumber, setWhatsappNumber] = useState('');
// const [message, setMessage] = useState('');

//   const [data, setData] = useState({
//     users: 0,
//     bookings: 0,
//     programs: 25,
//     trainers: 0,
//     contacts: 0,
//   });

//   useEffect(() => {
//     if (!user?.isAdmin) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // Initial fetch - fetch trainers on component mount
//   useEffect(() => {
//     fetchTrainers();
//   }, []);

//   // Tab switch handler
//   useEffect(() => {
//     if (activeTab === "bookings") {
//       fetchBookings();
//     } else if (activeTab === "contacts") {
//       fetchContacts();
//     } else if (activeTab === "users") {
//       fetchUsers();
//     } else if (activeTab === "trainers") {
//       fetchTrainers();
//     } else if (activeTab === "overview") {
//       fetchBookings();
//       fetchContacts();
//       fetchUsers();
//       fetchTrainers();
//     }
//   }, [activeTab]);
// //whatsapp
//   useEffect(() => {
//     const fetchNumber = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/settings/whatsapp');
//         setWhatsappNumber(res.data.whatsappNumber);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchNumber();
//   }, []);
// const handleUpdateNumber = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token'); // या जो भी नाम से आपने Auth token सेव किया हो
//       const config = { headers: { Authorization: `Bearer ${token}` } };
      
//       const res = await axios.put('http://localhost:5000/api/settings/whatsapp', { whatsappNumber }, config);
//       setMessage('WhatsApp number updated successfully!');
//     } catch (error) {
//       setMessage('Failed to update number. Check admin authorization.');
//       console.error(error);
//     }
//   };

//   const fetchTrainers = async () => {
//     try {
//       setLoadingTrainers(true);
//       const res = await API.get("/trainers");
//       setTrainers(res.data);
//       setData(prev => ({ ...prev, trainers: res.data.length }));
//     } catch (error) {
//       console.error("Error fetching trainers", error);
//     } finally {
//       setLoadingTrainers(false);
//     }
//   };

//   const fetchBookings = async () => {
//     try {
//       setLoadingBookings(true);
//       const token = localStorage.getItem("token");
//       const API_URL = import.meta.env.VITE_API_URL;
//       const response = await axios.get(`${API_URL}/bookings`, {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setBookings(response.data);
//       setData(prev => ({ ...prev, bookings: response.data.length }));
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setLoadingBookings(false);
//     }
//   };

//   const fetchContacts = async () => {
//     try {
//       setLoadingContacts(true);
//       const token = localStorage.getItem("token");
//       const API_URL = import.meta.env.VITE_API_URL;
//       const response = await axios.get(`${API_URL}/contact`, {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setContacts(response.data);
//       setData(prev => ({ ...prev, contacts: response.data.length }));
//     } catch (error) {
//       console.error("Error fetching contacts:", error);
//     } finally {
//       setLoadingContacts(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       setLoadingUsers(true);
//       const token = localStorage.getItem("token");
//       const API_URL = import.meta.env.VITE_API_URL;
//       const response = await axios.get(`${API_URL}/auth/users`, {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setUsersList(response.data);
//       setData(prev => ({ ...prev, users: response.data.length }));
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   const handleDeleteContact = async (id) => {
//     if (window.confirm("Are you sure you want to delete this message?")) {
//       try {
//         const token = localStorage.getItem("token");
//         const API_URL = import.meta.env.VITE_API_URL;
//         await axios.delete(`${API_URL}/contact/${id}`, {
//           headers: { Authorization: "Bearer " + token },
//         });
//         setContacts(prev => prev.filter(c => c._id !== id));
//         setData(prev => ({ ...prev, contacts: prev.contacts - 1 }));
//       } catch (error) {
//         console.error("Error deleting contact:", error);
//       }
//     }
//   };

//   const handleDeleteTrainer = async (id) => {
//     if (window.confirm("Are you sure you want to delete this trainer?")) {
//       try {
//         await API.delete(`/trainers/${id}`);
//         setTrainers(trainers.filter((t) => t._id !== id));
//         setData(prev => ({ ...prev, trainers: prev.trainers - 1 }));
//       } catch (error) {
//         console.error("Error deleting trainer", error);
//       }
//     }
//   };

//   if (!user?.isAdmin) {
//     return null;
//   }

//   const tabs = [
//     { id: "overview", label: "?? Overview" },
//     { id: "programs", label: "?????? Programs" },
//     { id: "trainers", label: "?? Trainers" },
//     { id: "pricing", label: "?? Pricing" },
//     { id: "bookings", label: "?? Bookings" },
//     { id: "contacts", label: "?? Contacts" },
//     { id: "users", label: "?? Users" },
//   ];

//   return (
//     <div className="min-h-screen bg-dark py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-5xl font-bold mb-12">
//           <span className="gradient-text">Admin Dashboard</span>
//         </h1>

//         <div className="flex gap-2 mb-12 flex-wrap">
//           {tabs.map((tab) => (
//             <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? "bg-primary text-white" : "bg-gray-800 text-gray-300"} px-6 py-3 rounded-lg font-medium transition`}>
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {activeTab === "overview" && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//             <div className="card-dark"><div className="text-3xl mb-4">??</div><p className="text-gray-400 mb-2">Total Users</p><p className="text-4xl font-bold text-primary">{data.users}</p></div>
//             <div className="card-dark"><div className="text-3xl mb-4">??</div><p className="text-gray-400 mb-2">Bookings</p><p className="text-4xl font-bold text-primary">{data.bookings}</p></div>
//             <div className="card-dark"><div className="text-3xl mb-4">??????</div><p className="text-gray-400 mb-2">Programs</p><p className="text-4xl font-bold text-primary">{data.programs}</p></div>
//             <div className="card-dark"><div className="text-3xl mb-4">??</div><p className="text-gray-400 mb-2">Trainers</p><p className="text-4xl font-bold text-primary">{data.trainers}</p></div>
//             <div className="card-dark"><div className="text-3xl mb-4">??</div><p className="text-gray-400 mb-2">Messages</p><p className="text-4xl font-bold text-primary">{data.contacts}</p></div>
//           </div>
//         )}

//         {activeTab === "programs" && (
//           <div className="card-dark">
//             <h3 className="text-2xl font-bold text-primary mb-6">Manage Programs</h3>
//             <button onClick={() => navigate("/add-program")} className="btn-neon w-full md:w-auto">+ Add Program</button>
//             <div className="bg-dark-tertiary p-6 rounded-lg mt-4"><p className="text-gray-400">Program management interface coming soon...</p></div>
//           </div>
//         )}

//         {activeTab === "trainers" && (
//           <div className="card-dark">
//             <h3 className="text-2xl font-bold text-primary mb-6">Manage Trainers</h3>
//             <div className="flex gap-3 mb-6">
//               <button onClick={() => navigate("/add-trainer")} className="btn-neon w-full md:w-auto">+ Add New Trainer</button>
//               <button onClick={fetchTrainers} disabled={loadingTrainers} className="btn-neon w-full md:w-auto">{loadingTrainers ? "Refreshing..." : "?? Refresh"}</button>
//             </div>
//             {loadingTrainers ? (
//               <div className="text-center py-8"><p className="text-gray-400">Loading trainers...</p></div>
//             ) : trainers.length === 0 ? (
//               <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No trainers found. Add some!</p></div>
//             ) : (
//               <div className="space-y-4">
//                 {trainers.map((trainer) => (
//                   <div key={trainer._id} className="flex justify-between items-center bg-dark-tertiary p-4 rounded-lg border border-gray-800">
//                     <div className="flex items-center gap-4">
//                       {trainer.image && <img src={trainer.image} alt={trainer.name} className="w-16 h-16 rounded object-cover" />}
//                       <div>
//                         <h4 className="text-xl font-bold text-white">{trainer.name}</h4>
//                         <p className="text-primary text-sm">{trainer.speciality || "Specialist"}</p>
//                       </div>
//                     </div>
//                     <button onClick={() => handleDeleteTrainer(trainer._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">Delete</button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "pricing" && (
//           <div className="card-dark">
//             <h3 className="text-2xl font-bold text-primary mb-6">Manage Pricing</h3>
//             <button className="btn-neon w-full md:w-auto" onClick={() => navigate("/add-pricing")}>+ Add Pricing Plan</button>
//             <div className="bg-dark-tertiary p-6 rounded-lg mt-4"><p className="text-gray-400">Pricing management interface coming soon...</p></div>
//           </div>
//         )}

//         {activeTab === "bookings" && (
//           <div className="card-dark">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//               <h3 className="text-2xl font-bold text-primary">View All Bookings</h3>
//               <div className="flex items-center gap-3 w-full md:w-auto">
//                 <input type="text" placeholder="Search booking by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-dark-tertiary border border-primary/20 text-gray-200 px-4 py-2 rounded-lg text-sm w-full md:w-64"/>
//                 <button onClick={fetchBookings} disabled={loadingBookings} className="btn-neon py-2 px-4 text-sm">{loadingBookings ? "Refreshing..." : "Refresh"}</button>
//               </div>
//             </div>
//             {loadingBookings ? (
//               <div className="text-center py-8"><p className="text-gray-400">Loading bookings...</p></div>
//             ) : bookings.length === 0 ? (
//               <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No bookings found</p></div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full"><thead><tr className="border-b border-primary/30"><th className="text-left py-4 px-4 text-primary font-bold">Photo</th><th className="text-left py-4 px-4 text-primary font-bold">Name</th><th className="text-left py-4 px-4 text-primary font-bold">Email</th><th className="text-left py-4 px-4 text-primary font-bold">Plan</th><th className="text-left py-4 px-4 text-primary font-bold">Amount</th><th className="text-left py-4 px-4 text-primary font-bold">Status</th><th className="text-left py-4 px-4 text-primary font-bold">Date</th></tr></thead><tbody>{bookings.filter((booking) => {const searchLower = searchTerm.toLowerCase(); return (booking.user?.name?.toLowerCase().includes(searchLower) || booking.user?.email?.toLowerCase().includes(searchLower));}).map((booking) => (<tr key={booking._id} className="border-b border-dark-tertiary"><td className="py-4 px-4">{booking.user?.passport ? (<img src={booking.user.passport} alt="Profile" className="w-12 h-12 rounded object-cover"/>) : (<div className="w-12 h-12 rounded bg-dark-tertiary flex items-center justify-center text-gray-500">N/A</div>)}</td><td className="py-4 px-4 text-gray-300 font-medium">{booking.user?.name || "N/A"}</td><td className="py-4 px-4 text-gray-300 text-sm">{booking.user?.email || "N/A"}</td><td className="py-4 px-4 text-gray-300 text-sm">{booking.plan?.title || "N/A"}</td><td className="py-4 px-4 text-primary font-bold">?{booking.amount || 0}</td><td className="py-4 px-4"><span className={`px-3 py-1 rounded text-sm font-medium ${booking.paymentStatus === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{booking.paymentStatus}</span></td><td className="py-4 px-4 text-gray-400 text-sm">{new Date(booking.createdAt).toLocaleDateString()}</td></tr>))}</tbody></table>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "contacts" && (
//           <div className="card-dark">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-primary">Contact Messages</h3>
//               <button onClick={fetchContacts} disabled={loadingContacts} className="btn-neon py-2 px-4 text-sm">{loadingContacts ? "Refreshing..." : "Refresh"}</button>
//             </div>
//             {loadingContacts ? (
//               <div className="text-center py-8"><p className="text-gray-400">Loading messages...</p></div>
//             ) : contacts.length === 0 ? (
//               <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No messages found</p></div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full"><thead><tr className="border-b border-primary/30"><th className="text-left py-4 px-4 text-primary font-bold">Name</th><th className="text-left py-4 px-4 text-primary font-bold">Email</th><th className="text-left py-4 px-4 text-primary font-bold">Message</th><th className="text-left py-4 px-4 text-primary font-bold">Status</th><th className="text-left py-4 px-4 text-primary font-bold">Date</th><th className="text-left py-4 px-4 text-primary font-bold">Action</th></tr></thead><tbody>{contacts.map((msg) => (<tr key={msg._id} className="border-b border-dark-tertiary"><td className="py-4 px-4 text-gray-300 font-medium">{msg.name}</td><td className="py-4 px-4 text-gray-300 text-sm">{msg.email}</td><td className="py-4 px-4 text-gray-300 text-sm truncate">{msg.message}</td><td className="py-4 px-4"><span className={`px-2 py-1 rounded text-xs ${msg.status === "new" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}>{msg.status}</span></td><td className="py-4 px-4 text-gray-400 text-sm">{new Date(msg.createdAt).toLocaleDateString()}</td><td className="py-4 px-4"><button onClick={() => handleDeleteContact(msg._id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button></td></tr>))}</tbody></table>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "users" && ( 
//           <div className="card-dark">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//               <h3 className="text-2xl font-bold text-primary">User Management</h3>
//               <button onClick={fetchUsers} disabled={loadingUsers} className="btn-neon py-2 px-4 text-sm">{loadingUsers ? "Refreshing..." : "Refresh"}</button>
//             </div>
//             <div className="flex items-center gap-3 w-full md:w-auto mb-6">
//               <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-dark-tertiary border border-primary/20 text-gray-200 px-4 py-2 rounded-lg text-sm w-full md:w-64"/>
//             </div>
//             {loadingUsers ? (
//               <div className="text-center py-8"><p className="text-gray-400">Loading users...</p></div>
//             ) : usersList.length === 0 ? (
//               <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No users found</p></div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full"><thead><tr className="border-b border-primary/30"><th className="text-left py-4 px-4 text-primary font-bold">Name</th><th className="text-left py-4 px-4 text-primary font-bold">Email</th>
//                 <th className="text-left py-4 px-4 text-primary font-bold">Phone</th><th className="text-left py-4 px-4 text-primary font-bold">Role</th><th className="text-left py-4 px-4 text-primary font-bold">Join Date</th>
//                 </tr></thead><tbody>{usersList.filter((u) => {const searchLower = searchTerm.toLowerCase(); return u.name?.toLowerCase().includes(searchLower) || u.email?.toLowerCase().includes(searchLower);}).map((u) => (<tr key={u._id} className="border-b border-dark-tertiary">
//                   <td className="py-4 px-4 text-gray-300 font-medium">{u.name}</td><td className="py-4 px-4 text-gray-300 text-sm">{u.email}</td><td className="py-4 px-4 text-gray-300 text-sm">{u.phone || "N/A"}</td><td className="py-4 px-4">
//                     <span className={`px-2 py-0.5 rounded text-xs ${u.isAdmin ? "bg-purple-500/20 text-purple-400 font-bold" : "bg-green-500/20 text-green-400"}`}>{u.isAdmin ? "Admin" : "User"}</span></td><td className="py-4 px-4 text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td></tr>))}
//                     </tbody></table>
//               </div>
//             )}
            
//           </div>
//         )}
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md my-6 max-w-md border border-green-200">
//         <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
//           <span className="text-green-500">⚙️</span> WhatsApp Settings
//         </h3>
//         <form onSubmit={handleUpdateNumber} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               WhatsApp Number (With Country Code, No spaces or '+' sign)
//             </label>
//             <input
//               type="text"
//               placeholder="e.g. 919876543210"
//               className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm"
//               value={whatsappNumber}
//               onChange={(e) => setWhatsappNumber(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition"
//           >
//             Update WhatsApp Number
//           </button>
//         </form>
//         {message && (
//           <p className="mt-3 text-sm font-semibold text-center text-blue-600 bg-blue-50 p-2 rounded">
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../utils/api";

const AdminDashboard = () => {
  // Get tab from URL parameter if provided
  const searchParams = new URLSearchParams(window.location.search);
  const initialTab = searchParams.get("tab") || "overview";
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTrainers, setLoadingTrainers] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [message, setMessage] = useState('');

  const [data, setData] = useState({
    users: 0,
    bookings: 0,
    programs: 25,
    trainers: 0,
    contacts: 0,
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  // Initial fetch - fetch trainers on component mount
  useEffect(() => {
    fetchTrainers();
  }, []);

  // Tab switch handler
  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings();
    } else if (activeTab === "contacts") {
      fetchContacts();
    } else if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "trainers") {
      fetchTrainers();
    } else if (activeTab === "overview") {
      fetchBookings();
      fetchContacts();
      fetchUsers();
      fetchTrainers();
    }
  }, [activeTab]);

  // WhatsApp Fetch
  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings/whatsapp');
        setWhatsappNumber(res.data.whatsappNumber);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNumber();
  }, []);

  const handleUpdateNumber = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.put('http://localhost:5000/api/settings/whatsapp', { whatsappNumber }, config);
      setMessage('WhatsApp number updated successfully!');
    } catch (error) {
      setMessage('Failed to update number. Check admin authorization.');
      console.error(error);
    }
  };

  const fetchTrainers = async () => {
    try {
      setLoadingTrainers(true);
      const res = await API.get("/trainers");
      setTrainers(res.data);
      setData(prev => ({ ...prev, trainers: res.data.length }));
    } catch (error) {
      console.error("Error fetching trainers", error);
    } finally {
      setLoadingTrainers(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_URL}/bookings`, {
        headers: { Authorization: "Bearer " + token },
      });
      setBookings(response.data);
      setData(prev => ({ ...prev, bookings: response.data.length }));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true);
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_URL}/contact`, {
        headers: { Authorization: "Bearer " + token },
      });
      setContacts(response.data);
      setData(prev => ({ ...prev, contacts: response.data.length }));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_URL}/auth/users`, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsersList(response.data);
      setData(prev => ({ ...prev, users: response.data.length }));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_URL;
        await axios.delete(`${API_URL}/contact/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        setContacts(prev => prev.filter(c => c._id !== id));
        setData(prev => ({ ...prev, contacts: prev.contacts - 1 }));
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        await API.delete(`/trainers/${id}`);
        setTrainers(trainers.filter((t) => t._id !== id));
        setData(prev => ({ ...prev, trainers: prev.trainers - 1 }));
      } catch (error) {
        console.error("Error deleting trainer", error);
      }
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "programs", label: "🏋️‍♂️ Programs" },
    { id: "trainers", label: "👥 Trainers" },
    { id: "pricing", label: "💰 Pricing" },
    { id: "bookings", label: "📅 Bookings" },
    { id: "contacts", label: "📬 Contacts" },
    { id: "users", label: "👤 Users" },
  ];

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">
          <span className="gradient-text">Admin Dashboard</span>
        </h1>

        <div className="flex gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`${activeTab === tab.id ? "bg-primary text-white" : "bg-gray-800 text-gray-300"} px-6 py-3 rounded-lg font-medium transition`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-12">
            {/* Statistics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="card-dark"><div className="text-3xl mb-4">👥</div><p className="text-gray-400 mb-2">Total Users</p><p className="text-4xl font-bold text-primary">{data.users}</p></div>
              <div className="card-dark"><div className="text-3xl mb-4">📅</div><p className="text-gray-400 mb-2">Bookings</p><p className="text-4xl font-bold text-primary">{data.bookings}</p></div>
              <div className="card-dark"><div className="text-3xl mb-4">🏋️‍♂️</div><p className="text-gray-400 mb-2">Programs</p><p className="text-4xl font-bold text-primary">{data.programs}</p></div>
              <div className="card-dark"><div className="text-3xl mb-4">👥</div><p className="text-gray-400 mb-2">Trainers</p><p className="text-4xl font-bold text-primary">{data.trainers}</p></div>
              <div className="card-dark"><div className="text-3xl mb-4">📬</div><p className="text-gray-400 mb-2">Messages</p><p className="text-4xl font-bold text-primary">{data.contacts}</p></div>
            </div>

            {/* WhatsApp Settings Section - Perfectly Integrated with Dark Gym UI */}
            <div className="card-dark max-w-md border border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <span>⚙️</span> WhatsApp Settings
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Change the floating WhatsApp button link dynamic number.
              </p>
              <form onSubmit={handleUpdateNumber} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    WhatsApp Number (With Country Code, No spaces or '+' sign)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 919876543210"
                    className="w-full bg-dark-tertiary border border-primary/20 text-gray-200 px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:border-primary transition"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-neon w-full py-2.5 text-sm font-bold"
                >
                  Update WhatsApp Number
                </button>
              </form>
              {message && (
                <p className="mt-4 text-sm font-semibold text-center text-primary bg-primary/10 p-2.5 rounded-lg border border-primary/20">
                  {message}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === "programs" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Manage Programs</h3>
            <button onClick={() => navigate("/add-program")} className="btn-neon w-full md:w-auto">+ Add Program</button>
            <div className="bg-dark-tertiary p-6 rounded-lg mt-4"><p className="text-gray-400">Program management interface coming soon...</p></div>
          </div>
        )}

        {activeTab === "trainers" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Manage Trainers</h3>
            <div className="flex gap-3 mb-6">
              <button onClick={() => navigate("/add-trainer")} className="btn-neon w-full md:w-auto">+ Add New Trainer</button>
              <button onClick={fetchTrainers} disabled={loadingTrainers} className="btn-neon w-full md:w-auto">{loadingTrainers ? "Refreshing..." : "🔄 Refresh"}</button>
            </div>
            {loadingTrainers ? (
              <div className="text-center py-8"><p className="text-gray-400">Loading trainers...</p></div>
            ) : trainers.length === 0 ? (
              <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No trainers found. Add some!</p></div>
            ) : (
              <div className="space-y-4">
                {trainers.map((trainer) => (
                  <div key={trainer._id} className="flex justify-between items-center bg-dark-tertiary p-4 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-4">
                      {trainer.image && <img src={trainer.image} alt={trainer.name} className="w-16 h-16 rounded object-cover" />}
                      <div>
                        <h4 className="text-xl font-bold text-white">{trainer.name}</h4>
                        <p className="text-primary text-sm">{trainer.speciality || "Specialist"}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteTrainer(trainer._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Manage Pricing</h3>
            <button className="btn-neon w-full md:w-auto" onClick={() => navigate("/add-pricing")}>+ Add Pricing Plan</button>
            <div className="bg-dark-tertiary p-6 rounded-lg mt-4"><p className="text-gray-400">Pricing management interface coming soon...</p></div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="card-dark">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-bold text-primary">View All Bookings</h3>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <input type="text" placeholder="Search booking by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-dark-tertiary border border-primary/20 text-gray-200 px-4 py-2 rounded-lg text-sm w-full md:w-64"/>
                <button onClick={fetchBookings} disabled={loadingBookings} className="btn-neon py-2 px-4 text-sm">{loadingBookings ? "Refreshing..." : "Refresh"}</button>
              </div>
            </div>
            {loadingBookings ? (
              <div className="text-center py-8"><p className="text-gray-400">Loading bookings...</p></div>
            ) : bookings.length === 0 ? (
              <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No bookings found</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full"><thead><tr className="border-b border-primary/30"><th className="text-left py-4 px-4 text-primary font-bold">Photo</th><th className="text-left py-4 px-4 text-primary font-bold">Name</th><th className="text-left py-4 px-4 text-primary font-bold">Email</th><th className="text-left py-4 px-4 text-primary font-bold">Plan</th><th className="text-left py-4 px-4 text-primary font-bold">Amount</th><th className="text-left py-4 px-4 text-primary font-bold">Status</th><th className="text-left py-4 px-4 text-primary font-bold">Date</th></tr></thead><tbody>{bookings.filter((booking) => {const searchLower = searchTerm.toLowerCase(); return (booking.user?.name?.toLowerCase().includes(searchLower) || booking.user?.email?.toLowerCase().includes(searchLower));}).map((booking) => (<tr key={booking._id} className="border-b border-dark-tertiary"><td className="py-4 px-4">{booking.user?.passport ? (<img src={booking.user.passport} alt="Profile" className="w-12 h-12 rounded object-cover"/>) : (<div className="w-12 h-12 rounded bg-dark-tertiary flex items-center justify-center text-gray-500">N/A</div>)}</td><td className="py-4 px-4 text-gray-300 font-medium">{booking.user?.name || "N/A"}</td><td className="py-4 px-4 text-gray-300 text-sm">{booking.user?.email || "N/A"}</td><td className="py-4 px-4 text-gray-300 text-sm">{booking.plan?.title || "N/A"}</td><td className="py-4 px-4 text-primary font-bold">₹{booking.amount || 0}</td><td className="py-4 px-4"><span className={`px-3 py-1 rounded text-sm font-medium ${booking.paymentStatus === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{booking.paymentStatus}</span></td><td className="py-4 px-4 text-gray-400 text-sm">{new Date(booking.createdAt).toLocaleDateString()}</td></tr>))}</tbody></table>
              </div>
            )}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="card-dark">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-primary">Contact Messages</h3>
              <button onClick={fetchContacts} disabled={loadingContacts} className="btn-neon py-2 px-4 text-sm">{loadingContacts ? "Refreshing..." : "Refresh"}</button>
            </div>
            {loadingContacts ? (
              <div className="text-center py-8"><p className="text-gray-400">Loading messages...</p></div>
            ) : contacts.length === 0 ? (
              <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No messages found</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full"><thead><tr className="border-b border-primary/30"><th className="text-left py-4 px-4 text-primary font-bold">Name</th><th className="text-left py-4 px-4 text-primary font-bold">Email</th><th className="text-left py-4 px-4 text-primary font-bold">Message</th><th className="text-left py-4 px-4 text-primary font-bold">Status</th><th className="text-left py-4 px-4 text-primary font-bold">Date</th><th className="text-left py-4 px-4 text-primary font-bold">Action</th></tr></thead><tbody>{contacts.map((msg) => (<tr key={msg._id} className="border-b border-dark-tertiary"><td className="py-4 px-4 text-gray-300 font-medium">{msg.name}</td><td className="py-4 px-4 text-gray-300 text-sm">{msg.email}</td><td className="py-4 px-4 text-gray-300 text-sm truncate">{msg.message}</td><td className="py-4 px-4"><span className={`px-2 py-1 rounded text-xs ${msg.status === "new" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"}`}>{msg.status}</span></td><td className="py-4 px-4 text-gray-400 text-sm">{new Date(msg.createdAt).toLocaleDateString()}</td><td className="py-4 px-4"><button onClick={() => handleDeleteContact(msg._id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button></td></tr>))}</tbody></table>
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && ( 
          <div className="card-dark">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-bold text-primary">User Management</h3>
              <button onClick={fetchUsers} disabled={loadingUsers} className="btn-neon py-2 px-4 text-sm">{loadingUsers ? "Refreshing..." : "Refresh"}</button>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto mb-6">
              <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-dark-tertiary border border-primary/20 text-gray-200 px-4 py-2 rounded-lg text-sm w-full md:w-64"/>
            </div>
            {loadingUsers ? (
              <div className="text-center py-8"><p className="text-gray-400">Loading users...</p></div>
            ) : usersList.length === 0 ? (
              <div className="bg-dark-tertiary p-6 rounded-lg"><p className="text-gray-400">No users found</p></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full"><thead><tr className="border-b border-primary/30"><th className="text-left py-4 px-4 text-primary font-bold">Name</th><th className="text-left py-4 px-4 text-primary font-bold">Email</th>
                <th className="text-left py-4 px-4 text-primary font-bold">Phone</th><th className="text-left py-4 px-4 text-primary font-bold">Role</th><th className="text-left py-4 px-4 text-primary font-bold">Join Date</th>
                </tr></thead><tbody>{usersList.filter((u) => {const searchLower = searchTerm.toLowerCase(); return u.name?.toLowerCase().includes(searchLower) || u.email?.toLowerCase().includes(searchLower);}).map((u) => (<tr key={u._id} className="border-b border-dark-tertiary">
                  <td className="py-4 px-4 text-gray-300 font-medium">{u.name}</td><td className="py-4 px-4 text-gray-300 text-sm">{u.email}</td><td className="py-4 px-4 text-gray-300 text-sm">{u.phone || "N/A"}</td><td className="py-4 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${u.isAdmin ? "bg-purple-500/20 text-purple-400 font-bold" : "bg-green-500/20 text-green-400"}`}>{u.isAdmin ? "Admin" : "User"}</span></td><td className="py-4 px-4 text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td></tr>))}
                    </tbody></table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;