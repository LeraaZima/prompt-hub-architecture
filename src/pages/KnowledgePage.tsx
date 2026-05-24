import { useState } from "react";

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
    description:
      "Узнайте, что такое промпт и как правильно формулировать запросы для ИИ",
    content:
      "Промпт (от англ. prompt — подсказка) — это текстовый запрос, который вы отправляете языковой модели. Качество ответа напрямую зависит от того, насколько точно и полно вы сформулировали задачу.\n\n## Основные принципы хорошего промпта:\n\n1. **Будьте конкретны** — чем точнее вопрос, тем точнее ответ\n2. **Задавайте контекст** — объясните, кто вы и зачем вам это нужно\n3. **Используйте примеры** — покажите, как должен выглядеть ответ\n4. **Указывайте формат** — скажите, в каком виде хотите получить результат\n5. **Ограничивайте длину** — если нужно, укажите максимальный объём ответа",
    category: "Основы",
    readTime: 5,
  },
  {
    id: 2,
    title: "Техника Chain-of-Thought (Цепочка мыслей)",
    description:
      "Как заставить ИИ рассуждать шаг за шагом для решения сложных задач",
    content:
      "Chain-of-Thought (CoT) — это техника, при которой вы просите модель показать ход своих рассуждений перед тем, как дать окончательный ответ.\n\n## Пример использования:\n\n```\nВопрос: У Маши было 15 яблок. Она отдала 3 яблока Пете, а потом купила ещё 7. Сколько яблок у Маши?\n\nПожалуйста, реши задачу пошагово:\n1. Сначала у Маши было 15 яблок\n2. Она отдала 3 → 15 - 3 = 12\n3. Купила ещё 7 → 12 + 7 = 19\n\nОтвет: 19 яблок\n```\n\n## Когда использовать:\n- Математические задачи\n- Логические рассуждения\n- Анализ текста\n- Планирование действий",
    category: "Продвинутые техники",
    readTime: 8,
  },
  {
    id: 3,
    title: "Ролевые промпты: как заставить ИИ стать экспертом",
    description:
      "Назначайте роли ИИ для получения более качественных ответов в конкретной области",
    content:
      'Ролевой промпт — это техника, при которой вы предлагаете модели "сыграть роль" определённого специалиста.\n\n## Шаблон ролевого промпта:\n```\nТы — {роль}. Твоя задача — {описание задачи}.\n\nТребования к ответу:\n- {требование 1}\n- {требование 2}\n\nВопрос: {вопрос}\n```\n\n## Примеры ролей:\n- 🤵‍♂️ **HR-специалист** — для проверки резюме\n- 💻 **Старший разработчик** — для код-ревью\n- 📝 **Профессиональный редактор** — для улучшения текстов\n- 🎓 **Учитель математики** — для объяснения сложных тем\n- 💼 **Бизнес-консультант** — для анализа проектов',
    category: "Продвинутые техники",
    readTime: 6,
  },
  {
    id: 4,
    title: "One-shot и Few-shot обучение",
    description:
      "Как использовать примеры в промптах для получения нужного формата ответов",
    content:
      "Few-shot — это техника, при которой вы показываете модели несколько примеров правильных ответов перед основным вопросом.\n\n## Пример few-shot промпта:\n\n```\nПример 1:\nВопрос: Какая столица Франции?\nОтвет: Париж\n\nПример 2:\nВопрос: Какая столица Германии?\nОтвет: Берлин\n\nТеперь ответь сам:\nВопрос: Какая столица Италии?\n```\n\n## Преимущества:\n- Задаёт формат ответа\n- Показывает стиль общения\n- Улучшает точность на специфических задачах\n\n## One-shot vs Few-shot:\n- **One-shot** — 1 пример\n- **Few-shot** — 2-5 примеров\n- **Zero-shot** — без примеров (модель догадывается сама)",
    category: "Техники обучения",
    readTime: 7,
  },
  {
    id: 5,
    title: "Ограничение длины и токенов",
    description: "Как правильно ограничивать объём ответов ИИ",
    content:
      "Токен — это минимальная единица текста, которую обрабатывает ИИ. Для разных моделей лимиты различаются.\n\n## Как ограничить ответ:\n\n**По длине:**\n```\nДай ответ не более чем на 100 слов\n```\n\n**По предложениям:**\n```\nОтветь в 2-3 предложениях\n```\n\n**По символам:**\n```\nНапиши текст длиной не более 500 символов\n```\n\n**По абзацам:**\n```\nДай ответ из 2 абзацев\n```\n\n## Советы:\n- Для кратких ответов укажите конкретное число\n- Для развёрнутых — используйте маркеры/структуру\n- Ключевые слова: **CAPS** для важных частей",
    category: "Оптимизация",
    readTime: 5,
  },
  {
    id: 6,
    title: "Использование переменных в промптах",
    description:
      "Создавайте шаблоны промптов с переменными для переиспользования",
    content:
      "Переменные {{в двойных фигурных скобках}} позволяют создавать универсальные шаблоны.\n\n## Пример шаблона с переменными:\n```\nТы — {{специализация}}. Напиши {{тип текста}} на тему {{тема}}.\n\nЦелевая аудитория: {{аудитория}}\nСтиль: {{стиль}}\nОбъём: {{объём}} слов\n```\n\n## Как использовать:\n1. Создайте шаблон в Редакторе промптов\n2. Замените {{переменные}} на нужные значения\n3. Сохраните как готовый шаблон\n\n## Преимущества:\n- 🔄 Переиспользование\n- 🚀 Ускорение работы\n- 📏 Единый стандарт качества",
    category: "Шаблоны",
    readTime: 4,
  },
];

const categories = [
  "Все",
  "Основы",
  "Продвинутые техники",
  "Техники обучения",
  "Оптимизация",
  "Шаблоны",
];

export default function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(
    (a) => selectedCategory === "Все" || a.category === selectedCategory,
  );

  return (
    <div>
      <h1 style={{ marginBottom: "0.5rem" }}>📚 База знаний</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        Учитесь правильно формулировать промпты для лучших результатов
      </p>

      {selectedArticle ? (
        <>
          <button
            onClick={() => setSelectedArticle(null)}
            className="btn-secondary"
            style={{ marginBottom: "1.5rem", padding: "0.5rem 1rem" }}
            aria-label="Назад к списку"
          >
            ← Назад к списку
          </button>
          <div className="card">
            <h2 style={{ marginBottom: "0.5rem" }}>{selectedArticle.title}</h2>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              <span>📁 {selectedArticle.category}</span>
              <span>⏱️ {selectedArticle.readTime} мин чтения</span>
            </div>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
              {selectedArticle.content}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s ease, color 0.2s ease",
                  background:
                    selectedCategory === cat ? "var(--primary)" : "transparent",
                  color:
                    selectedCategory === cat ? "white" : "var(--text-primary)",
                  fontWeight: "normal",
                  minWidth: "80px",
                  textAlign: "center",
                }}
                aria-label={`Категория ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gap: "1rem" }}>
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="card"
                onClick={() => setSelectedArticle(article)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                aria-label={`Открыть статью: ${article.title}`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: "0.5rem" }}>{article.title}</h3>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.875rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {article.description}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        color: "var(--text-muted)",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span>📁 {article.category}</span>
                      <span>⏱️ {article.readTime} мин</span>
                    </div>
                  </div>
                  <span
                    style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}
                  >
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
