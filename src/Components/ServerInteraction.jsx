// App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust the URL to match your server
function ServerInteraction() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Listen for messages from the server
    socket.on("message", (data) => {
      setReceivedMessages((prevMessages) => {
        // Check if the message is already present
        if (!prevMessages.includes(data)) {
          // If not, add it to the array
          const newMessages = [...prevMessages, data];
          console.log(newMessages);
          return newMessages;
        }
        // If the message is already present, return the current state
        return prevMessages;
      });
    });
    socket.on("recieved_message", (data) => {
      console.log(data);
    });
    // Clean up the socket connection on component unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, [socket]);

  const sendMessage = () => {
    // Send a message to the server
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      {/* <h1>WebSocket Example</h1> */}
      <div>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default ServerInteraction;
