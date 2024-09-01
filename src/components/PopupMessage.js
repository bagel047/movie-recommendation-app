import { useEffect, useState } from "react";
import { useMessage } from "../contexts/messageContext/messageContext";

export default function PopupMessage() {
  const { message, updateMessage, showMessage, updateShowMessage } =
    useMessage();

  useEffect(() => {
    if (message) {
      updateShowMessage(true);
      const timer = setTimeout(() => {
        updateShowMessage(false);

        setTimeout(() => {
          updateMessage("");
        }, 300);
      }, 2000);

      return () => {
        clearTimeout(timer);
        updateShowMessage(false);
      };
    }
  }, [message]);

  return (
    <div
      className={`fixed z-50 top-0 w-full left-0 mx-auto text-center transition-transform duration-300 ease-in-out ${
        showMessage ? "translate-y-12 opacity-100" : "-translate-y-12 opacity-0"
      }`}
    >
      <p className="bg-zinc-100 text-black bg-opacity-90 w-fit mx-auto px-4 py-2.5 rounded-lg text-sm tracking-wide">
        {message}
      </p>
    </div>
  );
}
