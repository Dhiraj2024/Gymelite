import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaFireAlt, FaDumbbell } from "react-icons/fa";
import { programAPI, trainerAPI, pricingAPI } from "../utils/api";

//
import About from "./About";
import Pricing from "./Pricing";
import Tips from "./Tips";
import Contact from "./Contact";
//
const Home = () => {
  const [programs, setPrograms] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, trainerRes, priceRes] = await Promise.all([
          programAPI.getAll(),
          trainerAPI.getAll(),
          pricingAPI.getAll(),
        ]);
        setPrograms(progRes.data.slice(0, 3));
        setTrainers(trainerRes.data.slice(0, 3));
        setPricing(priceRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-dark via-dark-secondary to-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-screen filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-success rounded-full mix-blend-screen filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
            <span className="gradient-text">Sculpt Your Body,</span>
            <br />
            <span className="text-white">Elevate Your</span>
            <br />
            <span className="gradient-text">Spirit</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Transform your fitness journey with expert trainers, personalized programs, and a supportive community
          </p>
          
          <div className="flex gap-6 justify-center flex-wrap">
            <Link to="/programs" className="btn-neon text-lg">
              LET'S MAKE YOU FIT 🔥
            </Link>
            <Link to="/about" className="btn-outline-neon text-lg">
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-6 md:gap-12">
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-gray-400 text-sm">Active Members</div>
            </div>
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-gray-400 text-sm">Programs</div>
            </div>
            <div className="glass-effect p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-gray-400 text-sm">Expert Trainers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="py-16 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-400 mb-8">Trusted by top athletes and brands</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <span className="text-2xl font-bold text-gray-600">Under Armour</span>
            <span className="text-2xl font-bold text-gray-600">Nike</span>
            <span className="text-2xl font-bold text-gray-600">Adidas</span>
            <span className="text-2xl font-bold text-gray-600">Puma</span>
            <span className="text-2xl font-bold text-gray-600">North Face</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="gradient-text">Discover What Sets Us Apart</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-dark">
              <div className="text-5xl mb-4">🥗</div>
              <h3 className="text-2xl font-bold text-primary mb-4">Nutrition Support</h3>
              <p className="text-gray-400">Personalized diet plans tailored to your fitness goals and lifestyle.</p>
            </div>
            <div className="card-dark">
              <div className="text-5xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-bold text-primary mb-4">Expert Trainers</h3>
              <p className="text-gray-400">Certified professionals guiding you every step of your fitness journey.</p>
            </div>
            <div className="card-dark">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-primary mb-4">Flexible Programs</h3>
              <p className="text-gray-400">Customizable workout programs that fit your schedule and goals.</p>
            </div>
          </div>
        </div>
      </section>


{/* About Section */}
<section id="about" className="py-20 bg-dark">
  <About />
</section>

      {/* Programs Preview */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Featured Programs</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Choose from our best-selling fitness programs</p>

          {loading ? (
            <div className="text-center text-gray-400">Loading programs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div key={program._id} className="card-dark group">
                  <div className="h-48 bg-gradient-neon rounded-lg mb-4 flex items-center justify-center text-4xl">
                    💪
                  </div>
                  <h3 className="text-xl font-bold mb-2">{program.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{program.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">₹{program.price}/month</span>
                    <Link to="/programs" className="btn-neon text-sm">
                      Explore
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/programs" className="btn-outline-neon">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Our Expert Trainers</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Learn from certified fitness professionals</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <div key={trainer._id} className="card-dark text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-neon rounded-full flex items-center justify-center text-5xl">
                  👨‍🏫
                </div>
                <h3 className="text-2xl font-bold mb-2">{trainer.name}</h3>
                <p className="text-primary mb-2">{trainer.speciality}</p>
                <p className="text-gray-400 text-sm">{trainer.bio || "Expert trainer with years of experience"}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/trainers" className="btn-outline-neon">
              Meet All Trainers
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-center text-gray-400 mb-12">Hear from our transformed members</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-dark">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark font-bold">JD</div>
                <div>
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-gray-400">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
              <p className="text-gray-400">"Amazing trainers and incredible results! Lost 20kg in 6 months."</p>
            </div>

            <div className="card-dark">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-dark font-bold">SJ</div>
                <div>
                  <h4 className="font-bold">Sarah Jane</h4>
                  <p className="text-sm text-gray-400">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
              <p className="text-gray-400">"Best investment in my health! The community is so supportive."</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn-outline-neon">
              Read More Stories
            </Link>
          </div>
        </div>
      </section>


{/* Pricing Section */}
<section id="pricing" className="py-20 bg-dark-secondary">
  <Pricing />
</section>

{/* Tips Section */}
<section id="tips" className="py-20 bg-dark">
  <Tips />
</section>


{/* Contact Section */}
<section id="contact" className="py-20 bg-dark-secondary">
  <Contact />
</section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-dark to-dark-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="gradient-text">Ready to Transform?</span>
          </h2>
          <p className="text-gray-400 mb-8">Join thousands of members achieving their fitness goals</p>
          
          <div className="flex gap-4 max-w-md mx-auto flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-dark-tertiary border border-primary/30 rounded-lg px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
            <button className="btn-neon">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
