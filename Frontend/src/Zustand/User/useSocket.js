import { io } from "socket.io-client";
import { create } from "zustand";

const useSocket = create((set) => {
  const socket = io("http://localhost:5000");
  return {
    socket: socket,
    emit: (event, data) => socket.emit(event, data),
    on: (event, callback) => socket.on(event, callback),
    off: (event, callback) => socket.off(event, callback),
    disconnect: () => socket.disconnect(),
  };
});

export default useSocket;
