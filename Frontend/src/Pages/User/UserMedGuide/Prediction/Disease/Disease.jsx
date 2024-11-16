import React, { useState } from "react";
import Card from "../../../../../Components/ui/Card.jsx";
import disease from "./DiseaseData.js";
import toast from "react-hot-toast";
import Modal from "../../../../../Components/ui/Modal.jsx";
import { getDiseaseInfo } from "../../../../../Services/User/Prediction/DiseaseInfo";

const Disease = () => {
  const diseases = disease;
  const [filteredDiseases, setFilteredDiseases] = useState(disease);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredDiseases(
      diseases.filter((disease) => disease.name.toLowerCase().includes(value))
    );
  };

  const handleClick = async (disease) => {
    setLoading(true);
    try {
      setIsModalOpen(true);
      const res = await getDiseaseInfo(disease);
      setSelectedDisease(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching disease information");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
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
        {filteredDiseases.map((disease, ind) => (
          <div key={ind} onClick={() => handleClick(disease)}>
            <Card key={ind} disease={disease} />
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        loading={loading}
        diseaseInfo={selectedDisease}
      />
    </div>
  );
};

export default Disease;
