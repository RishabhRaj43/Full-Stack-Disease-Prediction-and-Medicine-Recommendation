import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // Import the ReactMarkdown component
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { chatWithAi } from "../../../../Services/User/AI/AiRoute";

const Chatbot = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [showWarning, setShowWarning] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChat((prevChat) => [...prevChat, { role: "user", content: msg }]);
    setMsg("");

    try {
      const res = await chatWithAi(msg);

      setChat((prevChat) => [
        ...prevChat,
        { role: "assistant", content: res.data.message },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-[89vh] w-full justify-end  border rounded-lg shadow-lg">
      {showWarning && (
        <div className="px-2 py-1 text-md font-bold bg-cyan-300 flex justify-between text-gray-800">
          <h1 className="">
            This Chatbot is under development and Cannot remember previous
            chats.
          </h1>
          <button
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            onClick={() => setShowWarning(false)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`w-full p-2 mb-2 rounded ${
              message.role === "assistant"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            } text-wrap`}
          >
            <ReactMarkdown>{message.content}</ReactMarkdown>{" "}
          </div>
        ))}
      </div>

      <form
        className="w-full h-14 flex p-2 gap-3 bg-white border-t"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full p-2 h-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type here..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200 ease-in-out">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
