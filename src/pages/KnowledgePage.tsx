import { useState } from 'react';

interface Article {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: number;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Что такое промпт? Основы написания",
    description: "Узнайте, что такое промпт и как правильно формулировать запросы для ИИ",
    content: "Промпт (от англ. prompt — подсказка) — это текстовый запрос, который вы отправляете языковой модели. Качество ответа напрямую зависит от того, насколько точно и полно вы сформулировали задачу.\n\n## Основные принципы хорошего промпта:\n\n1. **Будьте конкретны** — чем точнее вопрос, тем точнее ответ\n2. **Задавайте контекст** — объясните, кто вы и зачем вам это нужно\n3. **Используйте примеры** — покажите, как должен выглядеть ответ\n4. **Указывайте формат** — скажите, в каком виде хотите получить результат\n5. **Ограничивайте длину** — если нужно, укажите максимальный объём ответа",
    category: "Основы",
    readTime: 5
  },
];

const categories = ["Все", "Основы", "Продвинутые техники", "Техники обучения", "Оптимизация", "Шаблоны"];

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(a => 
    selectedCategory === "Все" || a.category === selectedCategory
  );

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>📚 База знаний</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Учитесь правильно формулировать промпты для лучших результатов
      </p>

      {selectedArticle ? (
        <>
          <button 
            onClick={() => setSelectedArticle(null)}
            className="btn-secondary"
            style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}
            aria-label="Назад к списку"
          >
            ← Назад к списку
          </button>
          <div className="card">
            <h2 style={{ marginBottom: '0.5rem' }}>{selectedArticle.title}</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <span>📁 {selectedArticle.category}</span>
              <span>⏱️ {selectedArticle.readTime} мин чтения</span>
            </div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {selectedArticle.content}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                  color: selectedCategory === cat ? 'white' : 'var(--text-primary)',
                  fontWeight: selectedCategory === cat ? '600' : '400'
                }}
                aria-label={`Категория ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {filteredArticles.map(article => (
              <div 
                key={article.id} 
                className="card"
                onClick={() => setSelectedArticle(article)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label={`Открыть статью: ${article.title}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{article.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {article.description}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <span>📁 {article.category}</span>
                      <span>⏱️ {article.readTime} мин</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}