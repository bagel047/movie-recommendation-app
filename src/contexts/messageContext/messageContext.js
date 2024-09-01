import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  function updateMessage(newValue) {
    setMessage(newValue);
  }

  function updateShowMessage(value) {
    setShowMessage(value);
  }

  return (
    <MessageContext.Provider
      value={{ message, showMessage, updateMessage, updateShowMessage }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
