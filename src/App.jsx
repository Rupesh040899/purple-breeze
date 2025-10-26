import "./styles.css";

import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl h-5/6 bg-white rounded shadow-lg flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}
