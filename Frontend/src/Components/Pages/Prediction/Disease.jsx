import React, { useEffect, useState } from "react";
import Card from "../../ui/Card";
import axios from "axios";
import toast from "react-hot-toast";

const Disease = () => {
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/disease");
        setDiseases(res.data);
        setFilteredDiseases(res.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data);
      }
    };

    fetchDiseases();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredDiseases(
      diseases.filter((disease) => disease.name.toLowerCase().includes(value))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex-grow flex-col flex justify-around text-xl h-auto p-9">
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="password"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search disease"
          className="p-2 my-4 w-full border rounded-md bg-[#D2E0FB] focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
        />
        <button className="p-2 my-4 bg-[#37cdbe] text-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 w-20 text-md">
          Search
        </button>
      </form>
      <div className="grid grid-cols-6 gap-4">
        {filteredDiseases.map((disease) => (
          <Card key={disease._id} disease={disease} />
        ))}
      </div>
    </div>
  );
};

export default Disease;
