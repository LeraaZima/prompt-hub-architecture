import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

interface Template {
  id: number;
  title: string;
  description: string;
  prompt: string;
  category: string;
  icon: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: "Код-ревью ассистент",
    description: "Проверяет код на ошибки, уязвимости и предлагает улучшения",
    prompt: "## Инструкция\nТы - эксперт по код-ревью с {{лет}} лет опыта.\n\nПроанализируй следующий код и укажи:\n→ Потенциальные баги\n→ Улучшения производительности\n→ Рекомендации по безопасности\n→ Рекомендации по стилю кода\n\nКОД:\n```\n{{code}}\n```\n\nЯзык программирования: {{language}}",
    category: "Программирование",
    icon: "💻"
  },
  {
    id: 2,
    title: "Генератор документации",
    description: "Создаёт документацию для функций и API",
    prompt: "## Задача\nСоздай документацию для функции {{functionName}}.\n\nКОД:\n```\n{{code}}\n```\n\n**Требования:**\n- Описание параметров (название, тип, описание)\n- Что возвращает функция\n- Пример использования\n- CAPS для важных замечаний\n- Возможные ошибки",
    category: "Программирование",
    icon: "📝"
  },
  {
    id: 3,
    title: "Email-писатель",
    description: "Помогает писать профессиональные письма",
    prompt: "## Роль\nТы - профессиональный копирайтер и PR-специалист.\n\nНапиши email на тему: {{topic}}\n\n**Стиль:** {{style}} (формальный/неформальный/дружеский)\n**Получатель:** {{recipient}}\n**Цель письма:** {{goal}}\n\n**Требования:**\n→ Приветствие\n→ Основная мысль\n→ Призыв к действию\n→ Подпись",
    category: "Бизнес",
    icon: "📧"
  },
  {
    id: 4,
    title: "Переводчик с сохранением стиля",
    description: "Переводит текст, сохраняя стилистику и терминологию",
    prompt: "Ты - профессиональный переводчик. Переведи следующий текст с {{source_lang}} на {{target_lang}}.\n\nТЕКСТ:\n```\n{{text}}\n```\n\n**Требования:**\n- Сохрани стиль оригинального текста\n- Сохрани форматирование\n- Для терминов из области {{domain}} используй специализированный словарь\n- CAPS для важных частей",
    category: "Текст",
    icon: "🌐"
  },
  {
    id: 5,
    title: "Анализ тональности",
    description: "Определяет эмоциональную окраску текста",
    prompt: "## Задача\nПроанализируй тональность следующего текста.\n\nТЕКСТ:\n```\n{{text}}\n```\n\n**Что нужно определить:**\n1. Общая тональность (позитивная/негативная/нейтральная)\n2. Эмоции (радость, гнев, грусть, страх, удивление)\n3. Интенсивность (1-10)\n4. Ключевые слова, влияющие на тональность\n\n→ Ответ оформи в виде структурированного списка",
    category: "Анализ",
    icon: "📊"
  },
  {
    id: 6,
    title: "Генератор идей для постов",
    description: "Генерирует идеи для социальных сетей и блогов",
    prompt: "Ты - креативный маркетолог. Сгенерируй {{count}} идей для постов в социальных сетях.\n\n**Тема:** {{topic}}\n**Платформа:** {{platform}} (Telegram/Instagram/VK/Twitter)\n**Целевая аудитория:** {{audience}}\n\n**Формат идей:**\n→ Заголовок\n→ Краткое описание\n→ Тип контента (текст/видео/опрос/карусель)\n→ Хэштеги\n\n💡 CAPS для ключевых преимуществ",
    category: "Маркетинг",
    icon: "💡"
  },
  {
    id: 7,
    title: "SQL-генератор",
    description: "Создаёт SQL-запросы по описанию",
    prompt: "## Запрос\nСоздай SQL-запрос для:\n{{description}}\n\n**Схема БД:**\n{{schema}}\n\n**Требования:**\n- Используй {{dialect}} синтаксис\n- Добавь комментарии\n- Оптимизируй индексами\n- CAPS для ключевых слов",
    category: "Базы данных",
    icon: "🗄️"
  },
  {
    id: 8,
    title: "Резюме анализатора",
    description: "Помогает улучшить резюме",
    prompt: "## Роль\nТы - HR-специалист с {{experience}} лет опыта.\n\nПроанализируй резюме кандидата на позицию {{position}}.\n\nРЕЗЮМЕ:\n```\n{{resume}}\n```\n\n**Что оценить:**\n→ Сильные стороны\n→ Что можно улучшить\n→ Соответствие требованиям вакансии\n→ Рекомендации по доработке\n\nВАЖНО: дай конкретные советы по улучшению",
    category: "Карьера",
    icon: "📄"
  }
];

const categories = ["Все", "Программирование", "Бизнес", "Текст", "Анализ", "Маркетинг", "Базы данных", "Карьера"];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const { copyToClipboard, copied } = useCopyToClipboard();
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredTemplates = templates.filter(t => 
    selectedCategory === "Все" || t.category === selectedCategory
  );

  const handleCopy = async (id: number, prompt: string) => {
    const success = await copyToClipboard(prompt);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleUse = (prompt: string) => {
    localStorage.setItem('editorPlaceholder', prompt);
    navigate('/editor');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '0.5rem' }}>📋 Готовые шаблоны</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Используйте готовые шаблоны промптов или настройте их под свои задачи
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'btn' : 'btn-secondary'}
            style={{ padding: '0.5rem 1rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredTemplates.map(template => (
          <div key={template.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{template.icon}</span>
                  <h3 style={{ margin: 0 }}>{template.title}</h3>
                  <span className="tag">{template.category}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {template.description}
                </p>
                <div style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: '0.75rem', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '150px',
                  overflow: 'auto'
                }}>
                  {template.prompt.substring(0, 200)}...
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                <button
                  onClick={() => handleCopy(template.id, template.prompt)}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  {copiedId === template.id ? '✅ Скопировано' : '📋 Копировать'}
                </button>
                <button
                  onClick={() => handleUse(template.prompt)}
                  className="btn"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  ✏️ Использовать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}