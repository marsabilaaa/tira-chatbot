"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next-router-mock";

interface Session {
  session_id: string;
}

const Sidebar = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Ambil daftar sesi dari backend
    fetch("/api/sessions")
      .then((response) => response.json())
      .then((data) => setSessions(data.sessions));
  }, []);

  const handleSessionClick = (session_id: string) => {
    // Navigasi ke halaman percakapan dengan session_id
    router.push(`/chat/${session_id}`);
  };

  return (
    <div className="w-64 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Histori Percakapan</h2>
      <ul>
        {sessions.map((session) => (
          <li
            key={session.session_id}
            className="mb-2 cursor-pointer"
            onClick={() => handleSessionClick(session.session_id)}
          >
            {session.session_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
