import { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [mapAddress, setMapAddress] = useState("");
  const [loading, setLoading] = useState(true);

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
      setMapAddress("123 Fitness Street, Gym City, GC 12345");
    } finally {
      setLoading(false);
    }
  };

  // Generate Google Maps URL from address
  const getMapsUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/${encodedAddress}`;
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">?? Visit Us</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find our gym location and visit us for the ultimate fitness experience.
          </p>
        </div>

        {/* Main Content */}
        <div className="card-dark border border-primary/20">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="text-4xl">???</span> Our Location
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-gray-400">Loading address...</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2 font-semibold">
                      ADDRESS
                    </p>
                    <p className="text-2xl text-gray-200 font-bold leading-relaxed">
                      {mapAddress}
                    </p>
                  </div>

                  <div className="border-t border-primary/20 pt-6">
                    <p className="text-sm text-gray-400 mb-2 font-semibold">
                      CONTACT US
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="text-primary font-bold">Phone:</span> (123) 456-7890
                      </p>
                      <p className="text-gray-300">
                        <span className="text-primary font-bold">Email:</span> info@gyme.com
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-primary/20 pt-6">
                    <p className="text-sm text-gray-400 mb-2 font-semibold">
                      HOURS
                    </p>
                    <div className="space-y-1">
                      <p className="text-gray-300">Mon - Fri: 6:00 AM - 10:00 PM</p>
                      <p className="text-gray-300">Sat - Sun: 7:00 AM - 9:00 PM</p>
                    </div>
                  </div>

                  <a
                    href={getMapsUrl(mapAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon w-full py-3 text-center mt-6 font-bold inline-block"
                  >
                    Get Directions ???
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
