import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true, // wajib karena pakai session + cookie
  autoConnect: false, // jangan connect otomatis saat import
});

export default socket;
