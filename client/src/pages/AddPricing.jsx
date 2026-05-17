import { useState, useContext } from "react";
import { pricingAPI } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const AddPricing = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pricingAPI.create(form);
    alert("Pricing Added!");
  };

  return (
    <div className="card-dark max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Pricing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Title" onChange={(e)=>setForm({...form,title:e.target.value})}/>
        <input placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})}/>
        <input placeholder="Price (999/year)" onChange={(e)=>setForm({...form,price:e.target.value})}/>
        <input placeholder="Duration" onChange={(e)=>setForm({...form,duration:e.target.value})}/>

        <button className="btn-neon w-full">Add Plan</button>
      </form>
    </div>
  );
};

export default AddPricing;
