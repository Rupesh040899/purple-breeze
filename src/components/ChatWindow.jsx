import { useState } from "react";
import ChatBubble from "./ChatBubble";
import { getAIResponse } from "../utils/aiService";
import { generatePPT } from "../utils/pptService";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ppt, setPpt] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", message: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const aiResponse = await getAIResponse(input);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: aiResponse.text || "Generated slide content!",
        },
      ]);

      // Generate PPT
      const pptx = generatePPT(aiResponse.slides || []);
      setPpt(pptx);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", message: `⚠️ Error: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto mb-4 border-b pb-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} {...msg} />
        ))}
        {loading && (
          <div className="text-sm text-gray-500 text-center">Thinking...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your topic or request..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>

      {ppt && (
        <button
          className="mt-4 bg-green-500 text-white p-2 rounded"
          onClick={() =>
            ppt.writeFile({ fileName: "AI_Generated_Presentation.pptx" })
          }
        >
          Download PPT
        </button>
      )}
    </div>
  );
}
