import socket from "@/lib/socket";
import { useEffect } from "react";
// import socket from "../lib/socket";

export const useSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onConnect = () => {
      console.log("Connected:", socket.id);
    };

    const onDisconnect = () => {
      console.log("Disconnected");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return socket;
};
