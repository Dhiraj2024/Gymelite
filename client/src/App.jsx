import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsappFloat from './components/WhatsappFloat';
import AddProgram from "./pages/AddProgram";
import AddPricing from "./pages/AddPricing";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Trainers from "./pages/Trainers";
import Testimonials from "./pages/Testimonials";
import Pricing from "./pages/Pricing";
import Tips from "./pages/Tips";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";


// Admin
import AdminDashboard from "./admin/AdminDashboard";
import AddTrainer from "./pages/AddTrainer";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen bg-dark">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/add-trainer" element={<AddTrainer />} />
            <Route path="/add-program" element={<AddProgram />} />
            <Route path="/add-pricing" element={<AddPricing />} />
          </Routes>
        </main>
        <Footer />
        <WhatsappFloat />
      </AuthProvider>
    </Router>
  );
}

export default App;

