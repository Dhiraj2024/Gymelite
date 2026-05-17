// import { useState, useEffect } from "react";
// import { pricingAPI } from "../utils/api";

// const Pricing = () => {
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     const fetchPricing = async () => {
//       try {
//         const res = await pricingAPI.getAll();
//         setPlans(res.data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     fetchPricing();
//   }, []);

//   return (
//     <div className="min-h-screen bg-dark py-20">
//       <div className="max-w-7xl mx-auto px-4">
//         <h1 className="text-5xl font-bold text-center mb-6">
//           <span className="gradient-text">Our Pricing Plans</span>
//         </h1>
//         <p className="text-center text-gray-400 mb-16">Choose the perfect plan for your fitness journey</p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {plans.length > 0 ? (
//             plans.map((plan) => (
//               <div key={plan._id} className="card-dark border-2 border-primary/50 hover:border-primary transition">
//                 <h3 className="text-2xl font-bold text-primary mb-2">{plan.name}</h3>
//                 <div className="text-4xl font-bold mb-4">₹{plan.price}<span className="text-lg text-gray-400">/{plan.duration}</span></div>
//                 <ul className="space-y-3 mb-8">
//                   {plan.features?.map((feature, idx) => (
//                     <li key={idx} className="text-gray-400 flex items-center gap-2">
//                       <span className="text-primary">✓</span> {feature}
//                     </li>
//                   ))}
//                 </ul>
//                 <button className="btn-neon w-full">Choose Plan</button>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-400 col-span-3">Loading plans...</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
import { useState, useEffect } from "react";
import { pricingAPI } from "../utils/api";

const Pricing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await pricingAPI.getAll();
        setPlans(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPricing();
  }, []);

  return (
    <div className="min-h-screen bg-dark py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-5xl font-bold text-center mb-6">
          <span className="gradient-text">Our Pricing Plans</span>
        </h1>

        <p className="text-center text-gray-400 mb-16">
          Choose the perfect plan for your fitness journey
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {plans.length > 0 ? (
            plans.map((plan) => (
              <div
                key={plan._id}
                className="card-dark border-2 border-primary/50 hover:border-primary transition p-6 text-center"
              >
                {/* TITLE */}
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {plan.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-400 mb-4">
                  {plan.description}
                </p>

                {/* PRICE */}
                <div className="text-4xl font-bold mb-2 text-white">
                  ₹{plan.price}
                </div>

                {/* DURATION */}
                <p className="text-gray-500 mb-6">
                  {plan.duration}
                </p>

                {/* BUTTON */}
                <button className="btn-neon w-full">
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 col-span-3">
              Loading plans...
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Pricing;