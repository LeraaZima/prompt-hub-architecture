import { useState } from "react";
import { usePrompts } from "../context/PromptContext";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

export default function HubPage() {
  const { getPublicPrompts, toggleFavorite, favorites } = usePrompts();
  const { copyToClipboard, copied } = useCopyToClipboard();
  const publicPrompts = getPublicPrompts();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = publicPrompts.filter((prompt) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "favorites" && favorites.includes(prompt.id));
    const matchesSearch =
      searchTerm === "" ||
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.tags.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCopy = async (id: string, content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "1rem" }}>📚 Промпт-хаб</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Поиск по названию или тегам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            fontSize: "1rem",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
          }}
        >
          <option value="all">Все промпты</option>
          <option value="favorites">⭐ Избранное</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: "1.5rem" }}>
        {filteredPrompts.map((prompt) => (
          <div key={prompt.id} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: "0.5rem" }}>
                  {prompt.title}
                  {prompt.isDemo && <span className="tag demo-tag">DEMO</span>}
                </h3>
                <p
                  style={{
                    color: "var(--gray)",
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {prompt.content.substring(0, 200)}...
                </p>
                {prompt.tags && (
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {prompt.tags.split(",").map((tag, i) => (
                      <span key={i} className="tag">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => handleCopy(prompt.id, prompt.content)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    padding: "0.5rem",
                  }}
                  title="Копировать в буфер"
                >
                  {copiedId === prompt.id ? "✅" : "📋"}
                </button>
                <button
                  onClick={() => toggleFavorite(prompt.id)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    padding: "0.5rem",
                  }}
                >
                  {favorites.includes(prompt.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div
            className="form-container"
            style={{ textAlign: "center", padding: "3rem" }}
          >
            <p>Ничего не найдено 😢</p>
          </div>
        )}
      </div>
    </div>
  );
}
