import React from "react";
import Book_Home_1 from "./Book_Home/Book_Home_1";
import Book_Home_2 from "./Book_Home/Book_Home_2";

const Book_Home = () => {
  return (
    <div className="mb-10" >
      <h1 className="text-6xl font-bold p-3 mb-10">Book Appointments</h1>
      <div className="flex">
        <div className="w-1/3">
          <Book_Home_1 />
        </div>
        <Book_Home_2 />
      </div>
    </div>
  );
};

export default Book_Home;
