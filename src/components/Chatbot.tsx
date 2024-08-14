"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";

export function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    // Generate new session ID every time the component is loaded
    const newSessionId = `session_${Date.now()}`;
    setSessionId(newSessionId);
  }, []);

  return (
    <div className="h-96 w-full max-w-[700px] bg-white bg-opacity-50 shadow-md rounded-lg p-4">
      <div className="flex flex-col h-full">
        <div className="flex-grow rounded-lg border border-gray-300 p-4 overflow-y-auto">
          <div />
          {messages.map((m, index) => {
            const isUserMessage = index % 2 === 0;
            return (
              <p
                className={`whitespace-pre-line mb-2 p-5 rounded-md ${
                  isUserMessage
                    ? "text-white font-mono font-extrabold text-right"
                    : "text-black font-mono"
                }`}
                key={index}
              >
                {m.content}
              </p>
            );
          })}
        </div>

        <div className="flex items-center mt-4">
          <form className="flex-1" onSubmit={handleSubmit}>
            <Input
              placeholder="Tanya Tira Keluhanmu!!"
              value={input}
              onChange={handleInputChange}
              className="w-full"
            />
          </form>
          <Button className="ml-2" type="submit">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
