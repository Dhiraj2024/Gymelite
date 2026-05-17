import { useState, useEffect } from "react";
import { reviewAPI } from "../utils/api";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch testimonials - in production would fetch from API
    setReviews([
      { id: 1, author: "John Doe", rating: 5, comment: "Amazing experience! Lost 20kg in 6 months." },
      { id: 2, author: "Sarah Smith", rating: 5, comment: "Best trainers and supportive community!" },
      { id: 3, author: "Mike Johnson", rating: 5, comment: "Transformed my life completely!" },
    ]);
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Submit review
      console.log("Review submitted:", newReview);
      setNewReview({ rating: 5, comment: "" });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Success Stories</span>
        </h1>
        <p className="text-center text-gray-400 mb-16">Hear from our transformed members</p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review) => (
            <div key={review.id} className="card-dark">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark font-bold">
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="font-bold">{review.author}</h4>
                  <p className="text-sm text-yellow-400">{'⭐'.repeat(review.rating)}</p>
                </div>
              </div>
              <p className="text-gray-400">"{review.comment}"</p>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="max-w-2xl mx-auto">
          <div className="card-dark">
            <h3 className="text-2xl font-bold text-primary mb-6">Share Your Story</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                >
                  {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Your Comment</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your fitness journey..."
                  className="w-full bg-dark-tertiary border border-primary/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary h-32"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="btn-neon w-full">
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
