import { Chatbot } from "@/components/Chatbot";
// import Generate from "@/components/generate";

export default function Home() {
  return (
    <main className="h-screen flex  flex-col items-center  p-14">
      <h2 className="mb-2 text-5xl text-red-600 font-mono font-extrabold">
        Tanya Tira
      </h2>
      <h3 className="mb-4 font-mono text-xl">
        Telkom Indonesia Responsive Assistant
      </h3>
      <Chatbot />
    </main>
  );
}
