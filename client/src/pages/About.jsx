const About = () => {
  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12">
          <span className="gradient-text">About GYME</span>
        </h1>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-5xl flex items-center justify-center h-96 bg-gradient-neon rounded-lg">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAXGXhRt-Pjfu6Z7qp_DcWDFm2TY4JaCpyrQ&s" alt="" />
          </div>
          <div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
  <div className="flex items-center justify-center h-96 bg-gradient-neon rounded-lg overflow-hidden">
    <img 
      src="https://as2.ftcdn.net/v2/jpg/00/99/82/15/1000_F_99821575_nVEHTBXzUnTcLIKN6yOymAWAnFwEybGb.jpg" 
      alt=""
      className="w-full h-full object-cover"
    />
  </div>
  <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Mission</h2>
            <p className="text-gray-400 mb-4 text-lg">
              At GYME, we believe in transforming lives through fitness. Our mission is to provide world-class training, personalized coaching, and a supportive community that inspires everyone to achieve their fitness goals.
            </p>
            <p className="text-gray-400 text-lg">
              With experienced trainers and state-of-the-art facilities, we're committed to helping you become the best version of yourself.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card-dark text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Vision</h3>
            <p className="text-gray-400">To be the leading fitness platform transforming millions of lives</p>
          </div>
          <div className="card-dark text-center">
            <div className="text-5xl mb-4">💪</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Community</h3>
            <p className="text-gray-400">Building a supportive community of fitness enthusiasts</p>
          </div>
          <div className="card-dark text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Excellence</h3>
            <p className="text-gray-400">Delivering excellence in every aspect of our service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
