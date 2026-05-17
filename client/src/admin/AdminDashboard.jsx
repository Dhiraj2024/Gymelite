import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [data, setData] = useState({
    users: 150,
    bookings: 89,
    programs: 25,
    trainers: 12,
    contacts: 34,
  });

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings();
    }
  }, [activeTab]);

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setBookings(response.data);
      setData(prev => ({ ...prev, bookings: response.data.length }));
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  if (!user?.isAdmin) {
    return null;
  }

  const tabs = [
    { id: "overview", label: "?? Overview" },
    { id: "programs", label: "?? Programs" },
    { id: "trainers", label: "????? Trainers" },
    { id: "pricing", label: "?? Pricing" },
    { id: "bookings", label: "?? Bookings" },
    { id: "contacts", label: "?? Contacts" },
    { id: "users", label: "?? Users" },
  ];

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">
          <span className="gradient-text">Admin Dashboard</span>
        </h1>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={px-6 py-3 rounded-lg font-medium transition \}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="card-dark">
              <div className="text-3xl mb-4">??</div>
              <p className="text-gray-400 mb-2">Total Users</p>
              <p className="text-4xl font-bold text-primary">{data.users}</p>
            </div>
            <div className="card-dark">
              <div className="text-3xl mb-4">??</div>
              <p className="text-gray-400 mb-2">Bookings</p>
              <p className="text-4xl font-bold text-primary">{data.bookings}</p>
            </div>
            <div className="card-dark">
              <div className="text-3xl mb-4">??</div>
              <p className="text-gray-400 mb-2">Programs</p>
              <p className="text-4xl font-bold text-primary">{data.programs}</p>
            </div>
            <div className="card-dark">
              <div className="text-3xl mb-4">?????</div>
              <p className="text-gray-400 mb-2">Trainers</p>
              <p className="text-4xl font-bold text-primary">{data.trainers}</p>
            </div>
            <div className="card-dark">
              <div className="text-3xl mb-4">??</div>
              <p className="text-gray-400 mb-2">Messages</p>
              <p className="text-4xl font-bold text-primary">{data.contacts}</p>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === "programs" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Manage Programs</h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/add-program")}
                className="btn-neon w-full md:w-auto"
              >
                + Add Program
              </button>

              <div className="bg-dark-tertiary p-6 rounded-lg">
                <p className="text-gray-400">Program management interface coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {/* Trainers Tab */}
        {activeTab === "trainers" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Manage Trainers</h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate("/add-trainer")}
                className="btn-neon w-full md:w-auto"
              >
                + Add New Trainer
              </button>
              <div className="bg-dark-tertiary p-6 rounded-lg">
                <p className="text-gray-400">Trainer management interface coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Manage Pricing</h3>
            <div className="space-y-4">
              <button
                className="btn-neon w-full md:w-auto"
                onClick={() => navigate("/add-pricing")}
              >
                + Add Pricing Plan
              </button>
              <div className="bg-dark-tertiary p-6 rounded-lg">
                <p className="text-gray-400">Pricing management interface coming soon...</p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">View All Bookings</h3>
            {loadingBookings ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-dark-tertiary p-6 rounded-lg">
                <p className="text-gray-400">No bookings found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/30">
                      <th className="text-left py-4 px-4 text-primary font-bold">Passport</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Username</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Email</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Age</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Address</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Amount</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Status</th>
                      <th className="text-left py-4 px-4 text-primary font-bold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-dark-tertiary hover:bg-dark-tertiary/50 transition">
                        <td className="py-4 px-4">
                          {booking.user?.passport ? (
                            <img
                              src={booking.user.passport}
                              alt="Passport"
                              className="w-12 h-12 rounded object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded bg-dark-tertiary flex items-center justify-center text-gray-500">
                              N/A
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-300">{booking.user?.name || "N/A"}</td>
                        <td className="py-4 px-4 text-gray-300">{booking.user?.email || "N/A"}</td>
                        <td className="py-4 px-4 text-gray-300">{booking.user?.age || "N/A"}</td>
                        <td className="py-4 px-4 text-gray-300 truncate max-w-xs">{booking.user?.address || "N/A"}</td>
                        <td className="py-4 px-4 text-primary font-bold">?{booking.amount || 0}</td>
                        <td className="py-4 px-4">
                          <span className={px-3 py-1 rounded text-sm font-medium \}>
                            {booking.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-400 text-sm">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Contact Messages</h3>
            <div className="bg-dark-tertiary p-6 rounded-lg">
              <p className="text-gray-400">Contacts list interface coming soon...</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">User Management</h3>
            <div className="bg-dark-tertiary p-6 rounded-lg">
              <p className="text-gray-400">Users list interface coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
