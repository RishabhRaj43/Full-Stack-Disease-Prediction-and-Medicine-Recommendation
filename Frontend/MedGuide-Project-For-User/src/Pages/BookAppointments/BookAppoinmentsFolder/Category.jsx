import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllCategories } from "../../../Apis/DoctorManagement/DoctorsInfo/DoctorInfo";
import { motion } from "framer-motion";

const Category = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(5);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categories") || null
  );
  const [totalLength, setTotalLength] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchCategory = async () => {
      const res = await getAllCategories(limit);
      setAllCategories(res.res.data.categories);
      setTotalLength(res.res.data.length);
    };
    fetchCategory();
  }, [limit]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    navigate(`?categories=${categoryName}`);
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-3xl font-semibold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Categories
        </motion.h2>
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md transition"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("");
            setSelectedCategory(null);
          }}
        >
          Clear Filter
        </motion.button>
      </div>
      <motion.div
        className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {allCategories.map((category) => (
          <motion.div
            key={category._id}
            className={`flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-md transition ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-blue-300 to-indigo-200 text-white"
                : ""
            } `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <input
              type="checkbox"
              id={category.name}
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={selectedCategory === category.name}
              onChange={() => handleCategoryChange(category.name)}
            />
            <label htmlFor={category.name} className=" text-gray-700">
              {category.name}
            </label>
          </motion.div>
        ))}
      </motion.div>

      {totalLength > 0 && totalLength > limit && (
        <motion.button
          className="mt-6 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={handleLoadMore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Load More
        </motion.button>
      )}

      {totalLength === 0 && (
        <motion.h2
          className="text-2xl font-semibold text-gray-600 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          No categories found
        </motion.h2>
      )}
    </div>
  );
};

export default Category;
