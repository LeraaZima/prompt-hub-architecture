import { Link, useNavigate } from "react-router-dom";
import { usePrompts } from "../context/PromptContext";

function highlightPreview(text: string, maxLength: number = 150) {
  let highlighted = text.substring(0, maxLength);

  highlighted = highlighted.replace(
    /^##\s+(.+)$/gm,
    '<span class="hljs-keyword">##</span> <span class="hljs-title">$1</span>',
  );
  highlighted = highlighted.replace(
    /\{\{(\w+)\}\}/g,
    '<span class="hljs-variable">{{$1}}</span>',
  );
  highlighted = highlighted.replace(
    /\b([A-Z]{3,})\b/g,
    '<span class="hljs-strong">$1</span>',
  );
  highlighted = highlighted.replace(
    /`([^`]+)`/g,
    '<code class="hljs-code">$1</code>',
  );
  highlighted = highlighted.replace(/→/g, '<span class="hljs-symbol">→</span>');
  highlighted = highlighted.replace(
    /\+\+\+(\w+)/g,
    '<span class="hljs-decorator">+++$1</span>',
  );

  if (text.length > maxLength) highlighted += "...";

  return highlighted;
}

export default function MyTemplatesPage() {
  const { getMyPrompts, deletePrompt } = usePrompts();
  const navigate = useNavigate();
  const myPrompts = getMyPrompts();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Удалить промпт "${title}"?`)) {
      deletePrompt(id);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1>📄 Мои шаблоны</h1>
        <Link to="/editor">
          <button className="btn">➕ Создать новый шаблон</button>
        </Link>
      </div>

      {myPrompts.length === 0 ? (
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
            У вас пока нет созданных промптов
          </p>
          <Link to="/editor">
            <button className="btn">Создать первый промпт</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {myPrompts.map((prompt) => (
            <div key={prompt.id} className="card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: "0.5rem" }}>{prompt.title}</h3>
                  <div
                    style={{
                      color: "var(--gray)",
                      fontSize: "0.875rem",
                      marginBottom: "0.5rem",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: highlightPreview(prompt.content),
                    }}
                  />
                  {prompt.tags && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {prompt.tags.split(",").map((tag, i) => (
                        <span key={i} className="tag">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: "0.75rem", color: "var(--gray)" }}>
                    {prompt.isPublic ? "🌍 Опубликован" : "🔒 Личный"} •{" "}
                    {new Date(prompt.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn-secondary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                    onClick={() => handleEdit(prompt.id)}
                  >
                    ✏️ Редактировать
                  </button>
                  <button
                    className="btn-secondary"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.875rem",
                      background: "#ef4444",
                      color: "white",
                      borderColor: "#ef4444",
                    }}
                    onClick={() => handleDelete(prompt.id, prompt.title)}
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
