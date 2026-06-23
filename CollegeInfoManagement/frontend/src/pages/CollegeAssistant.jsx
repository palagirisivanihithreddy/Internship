import { useState } from "react";

function CollegeAssistant() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello 👋 Ask me anything about colleges, departments, students, faculties, placements and courses."
    }
  ]);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userQuestion
      }
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question: userQuestion
          })
        }
      );

      const data = await response.text();

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data
        }
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "❌ Unable to connect to AI service."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: "ai",
        text: "Chat Cleared. Ask a new question."
      }
    ]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      askAI();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06132f",
        color: "white",
        padding: "30px"
      }}
    >
      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        🤖 College AI Assistant
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}
      >
        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          onKeyDown={handleKeyPress}
          placeholder="Ask anything about colleges..."
          style={{
            flex: 1,
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            fontSize: "16px"
          }}
        />

        <button
          onClick={askAI}
          disabled={loading}
          style={{
            padding: "15px 25px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <button
          onClick={clearChat}
          style={{
            padding: "15px 25px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Clear
        </button>
      </div>

      <div
        style={{
          background: "#10244d",
          borderRadius: "15px",
          padding: "20px",
          minHeight: "500px"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.type === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "15px"
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "12px",
                borderRadius: "12px",
                background:
                  msg.type === "user"
                    ? "#2563eb"
                    : "#17366d"
              }}
            >
              <strong>
                {msg.type === "user"
                  ? "You"
                  : "AI"}
                :
              </strong>

              <div
                style={{
                  marginTop: "5px"
                }}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              marginTop: "10px"
            }}
          >
            🤖 AI is thinking...
          </div>
        )}
      </div>
    </div>
  );
}

export default CollegeAssistant;