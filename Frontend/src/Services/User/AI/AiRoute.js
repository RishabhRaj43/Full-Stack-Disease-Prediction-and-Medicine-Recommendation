import {api} from "../../api.js";

export const chatWithAi = async (message) => {
  try {
    const res = await api.post("/ai/chat", { message });    
    return res;
  } catch (error) {
    console.log("Chat with AI Error: ", error);
  }
};