import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const BookingForm = ({ plan, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    address: user?.address || "",
    phone: user?.phone || "",
    bio: "",
    startDate: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age || formData.age < 13 || formData.age > 120)
      newErrors.age = "Please enter a valid age (13-120)";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) newErrors.phone = "Mobile number is required";
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    if (!formData.bio.trim()) newErrors.bio = "Bio is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Session expired. Please login again.");
        setLoading(false);
        return;
      }

      const API_URL = import.meta.env.VITE_API_URL;

      // Step 1: Create booking
      console.log("Creating booking with data:", { planId: plan._id, bio: formData.bio, startDate: formData.startDate });
      const bookingRes = await axios.post(
        `${API_URL}/bookings`,
        {
          planId: plan._id,
          slots: {
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false,
          },
          startDate: formData.startDate,
          endDate: new Date(new Date(formData.startDate).getTime() + 365 * 24 * 60 * 60 * 1000),
          bio: formData.bio,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const booking = bookingRes.data.booking;
      console.log("Booking created:", booking);

      // Step 2: Create payment order
      setPaymentProcessing(true);
      console.log("Creating payment order for booking:", booking._id, "amount:", plan.price);
      const orderRes = await axios.post(
        `${API_URL}/bookings/payment/order`,
        {
          bookingId: booking._id,
          amount: parseInt(plan.price),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const orderId = orderRes.data.orderId;
      console.log("Payment order created:", orderId);

      // Step 3: Initialize Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: orderId,
        amount: parseInt(plan.price) * 100,
        currency: "INR",
        name: "Gyme Fitness",
        description: `${plan.title} - ${plan.duration}`,
        prefill: {
          name: formData.name,
          email: user?.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          try {
            console.log("Payment successful, verifying with backend...", response);
            const verifyRes = await axios.post(
              `${API_URL}/bookings/payment/verify`,
              {
                bookingId: booking._id,
                razorpayOrderId: response.order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature || 'test_mode',
              },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            );

            console.log("Payment verified successfully:", verifyRes.data);
            setPaymentProcessing(false);
            onSuccess(verifyRes.data.booking);
            onClose();
          } catch (error) {
            setPaymentProcessing(false);
            console.error("Payment verification failed:", error.response?.data || error.message);
            alert("Payment verification failed: " + (error.response?.data?.message || error.message));
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentProcessing(false);
          },
        },
      };

      console.log("Razorpay Options:", {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: orderId,
        amount: parseInt(plan.price) * 100,
        currency: "INR",
      });

      if (!window.Razorpay) {
        alert("Razorpay failed to load. Please refresh the page.");
        setPaymentProcessing(false);
        return;
      }

      console.log("Opening Razorpay modal...");
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      console.error("Booking error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        stack: error.stack
      });
      alert("Error processing booking. Please try again.\nDetails: " + errorMsg);
    } finally {
      setLoading(false);
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-dark-secondary rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Complete Your Booking</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="bg-dark-tertiary p-4 rounded-lg mb-6">
          <p className="text-gray-400 text-sm mb-1">Selected Plan:</p>
          <p className="text-xl font-bold text-primary">{plan.title}</p>
          <p className="text-lg text-primary">₹{plan.price}</p>
          <p className="text-gray-400 text-sm">{plan.duration}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full bg-dark-tertiary text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-300 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              className="w-full bg-dark-tertiary text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.age && (
              <p className="text-red-400 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Mobile Number */}
          {/* <div>
            <label className="block text-gray-300 mb-2">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your 10-digit mobile number"
              maxLength="10"
              className="w-full bg-dark-tertiary text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div> */}

          {/* Address */}
          <div>
            <label className="block text-gray-300 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
              rows="2"
              className="w-full bg-dark-tertiary text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            {errors.address && (
              <p className="text-red-400 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Bio */}
          {/* <div>
            <label className="block text-gray-300 mb-2">Bio / Fitness Goals</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about your fitness goals or any relevant info..."
              rows="3"
              className="w-full bg-dark-tertiary text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            {errors.bio && (
              <p className="text-red-400 text-sm mt-1">{errors.bio}</p>
            )}
          </div> */}

          {/* Start Date */}
          <div>
            <label className="block text-gray-300 mb-2">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-dark-tertiary text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.startDate && (
              <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded font-medium transition"
              disabled={loading || paymentProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-neon font-medium transition"
              disabled={loading || paymentProcessing}
            >
              {loading || paymentProcessing ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
