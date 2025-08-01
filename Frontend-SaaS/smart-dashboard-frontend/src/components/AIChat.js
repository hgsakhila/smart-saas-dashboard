import React, { useState } from "react";
import "./AIChat.css";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Use .env variable or fallback to localhost
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error("AI backend error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setAnswer((prev) => prev + chunk);
      }
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ Error: Could not get response from AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Need help? Talk to your AI Assistant</h2>
      <div className="card p-4 shadow mt-4">
        <label htmlFor="question">🤖 Ask the Assistant</label>
        <input
          type="text"
          id="question"
          className="form-control mb-3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="E.g., List employees who joined in July"
        />
        <button onClick={handleAsk} className="btn btn-primary" disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </button>

        <div className="mt-4">
          <strong>Assistant:</strong>
          <div
            className="border p-3 mt-2 bg-light"
            style={{ minHeight: "50px", whiteSpace: "pre-wrap" }}
          >
            {answer || "Ask a question to get started!"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIChat;
