import { usePrompts } from "../context/PromptContext";

export default function FavoritesPage() {
  const { getFavorites, toggleFavorite } = usePrompts();
  const favorites = getFavorites();

  return (
    <div>
      <h1 style={{ marginBottom: "2rem" }}>❤️ Избранное</h1>

      {favorites.length === 0 ? (
        <div
          className="form-container"
          style={{ textAlign: "center", padding: "3rem" }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gray)",
              marginBottom: "1rem",
            }}
          >
            У вас пока нет избранных промптов
          </p>
          <p>Перейдите в Промпт-хаб, чтобы добавить промпты в избранное</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {favorites.map((prompt) => (
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
                    {prompt.isDemo && (
                      <span className="tag demo-tag">DEMO</span>
                    )}
                  </h3>
                  <p
                    style={{
                      color: "var(--gray)",
                      fontSize: "0.875rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {prompt.content.substring(0, 150)}...
                  </p>
                  {prompt.tags && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {prompt.tags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            background: "#e2e8f0",
                            padding: "2px 8px",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                          }}
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="btn-secondary"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    background: "#ef4444",
                    color: "white",
                    borderColor: "#ef4444",
                  }}
                  onClick={() => toggleFavorite(prompt.id)}
                >
                  ❌ Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
