import { useEffect, useRef, useState } from "react";

const API = "http://localhost:8000/chat";
const TIMEOUT_MS = 30000; // 30s

export default function Chatbot() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("chat");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Salut 👋 Écris un sujet (ex: présentation, restaurant, travail) !" },
  ]);

  const boxRef = useRef(null);

  // Auto-scroll en bas à chaque nouveau message
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const updatedMessages = [...messages, { role: "user", text }];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Historique: 10 derniers messages (user/bot) -> (user/assistant)
    const history = updatedMessages.slice(-10).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      text: m.text,
    }));

    // Timeout pour éviter rester bloqué sur "..."
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode, history }),
        signal: controller.signal,
      });

      // Si FastAPI renvoie une erreur, il renvoie souvent JSON {"detail": "..."}
      if (!res.ok) {
        let errMsg = `HTTP ${res.status}`;
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const errJson = await res.json().catch(() => null);
          if (errJson?.detail) errMsg = String(errJson.detail);
          else errMsg = JSON.stringify(errJson);
        } else {
          const errText = await res.text().catch(() => "");
          if (errText) errMsg = errText;
        }

        throw new Error(errMsg);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply ?? "(Réponse vide)" }]);
    } catch (err) {
      const msg =
        err?.name === "AbortError"
          ? "Timeout: le serveur a mis trop de temps à répondre."
          : err?.message || "Erreur inconnue";

      console.log("Erreur fetch:", err);
      setMessages((prev) => [...prev, { role: "bot", text: `⚠️ Erreur: ${msg}` }]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", fontFamily: "Arial" }}>
      <h2>EyaLernen Chatbot</h2>

      <div style={{ marginBottom: 10 }}>
        <select value={mode} onChange={(e) => setMode(e.target.value)} disabled={loading}>
          <option value="chat">Chat</option>
          <option value="correction">Correction</option>
          <option value="roleplay">Roleplay</option>
        </select>
      </div>

      <div
        ref={boxRef}
        style={{
          border: "1px solid #ddd",
          padding: 12,
          borderRadius: 10,
          height: 380,
          overflowY: "auto",
          background: "#fff",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 12px",
                borderRadius: 10,
                background: m.role === "user" ? "#e8f0ff" : "#f2f2f2",
                whiteSpace: "pre-wrap",
                maxWidth: "85%",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tape ton message..."
          style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #ddd" }}
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
}