import axios from "axios";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // Import the ReactMarkdown component

const Chatbot = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add user message to chat before sending
    setChat((prevChat) => [...prevChat, { role: "user", content: msg }]);
    setMsg("");

    try {
      const res = await axios.post("http://localhost:5000/ai/chat", {
        message: msg,
      });

      // Assuming res.data.message contains the assistant's reply
      setChat((prevChat) => [
        ...prevChat,
        { role: "assistant", content: res.data.message },
      ]);
      // Clear input field after sending the message
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-[89vh] w-full justify-end  border rounded-lg shadow-lg">
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
