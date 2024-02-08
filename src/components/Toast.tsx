import { MessageType } from "../Context";
import { TbProgressAlert, TbProgressX, TbX } from "react-icons/tb";

interface ToastProps {
  message: MessageType;
  clearMessage: () => void;
}

export default function Toast({ clearMessage, message }: ToastProps) {
  if (message.type === "none") return null;
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center pt-20 items-start">
      <div className="relative w-6/12 bg-white flex flex-col items-center text-red-600 py-3 rounded p-5">
        <span className="text-8xl py-10">
          {message.type === "error" ? <TbProgressX /> : <TbProgressAlert />}
        </span>
        <h3 className="font-bold text-2xl pb-4 uppercase">{message.type}</h3>

        <span className="font-light text-gray-600 text-center leading-8">
          {message.text}
        </span>
        <button
          className="text-red-600 bg-red-100 px-8 py-3 rounded-lg text-sm mt-8 hover:bg-red-200"
          onClick={() => clearMessage()}
        >
          Dismiss
        </button>
        <button
          className="absolute top-5 right-5 text-xl ml-auto text-red-600 bg-red-100 rounded-full p-1 hover:bg-red-200"
          onClick={() => clearMessage()}
        >
          <TbX />
        </button>
      </div>
    </div>
  );
}
