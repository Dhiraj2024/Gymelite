import { useState, useEffect } from "react";
import axios from "axios";

const MapAddressSettings = () => {
  const [mapAddress, setMapAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/settings/address");
      setMapAddress(res.data.address);
    } catch (error) {
      console.error("Error fetching address:", error);
      setMessage("Failed to load address");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    if (!mapAddress.trim()) {
      setMessage("Please enter a valid address");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.put(
        "http://localhost:5000/api/settings/address",
        { address: mapAddress },
        config
      );
      setMessage("? Map address updated successfully!");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update address. Check admin authorization.");
      setMessageType("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-dark max-w-2xl border border-primary/20">
      <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
        <span>??</span> Map Address Settings
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Update the gym location address that will be displayed on the website footer and location page.
      </p>

      <form onSubmit={handleUpdateAddress} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gym Location Address
          </label>
          <textarea
            placeholder="e.g., 123 Fitness Street, Gym City, GC 12345"
            className="w-full bg-dark-tertiary border border-primary/20 text-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-primary transition resize-none"
            value={mapAddress}
            onChange={(e) => setMapAddress(e.target.value)}
            rows="3"
            required
          />
        </div>

        <div className="bg-dark-tertiary p-3 rounded-lg border border-primary/10">
          <p className="text-xs text-gray-400">
            ?? <strong>Tip:</strong> Include street address, area, city, and postal code for best results.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-neon w-full py-3 text-sm font-bold disabled:opacity-50"
        >
          {loading ? "Updating..." : "?? Update Address"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm font-semibold text-center p-3 rounded-lg border ${
            messageType === "success"
              ? "text-green-400 bg-green-500/10 border-green-500/30"
              : "text-red-400 bg-red-500/10 border-red-500/30"
          }`}
        >
          {message}
        </p>
      )}

      {mapAddress && (
        <div className="mt-6 bg-dark-tertiary p-4 rounded-lg border border-primary/10">
          <p className="text-sm text-gray-400 mb-2">
            <strong className="text-primary">Current Address:</strong>
          </p>
          <p className="text-gray-300 text-sm">{mapAddress}</p>
        </div>
      )}
    </div>
  );
};

export default MapAddressSettings;
