import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  tags: string;
  isPublic: boolean;
  createdAt: string;
  isDemo?: boolean;
}

interface PromptContextType {
  prompts: Prompt[];
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt'>) => void;
  updatePrompt: (id: string, prompt: Omit<Prompt, 'id' | 'createdAt'>) => void;
  deletePrompt: (id: string) => void;
  getMyPrompts: () => Prompt[];
  getPublicPrompts: () => Prompt[];
  getFavorites: () => Prompt[];
  toggleFavorite: (id: string) => void;
  favorites: string[];
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

const demoPrompts: Prompt[] = [
  {
    id: 'demo1',
    title: 'Код-ревью ассистент',
    content: '## Инструкция\nТы — эксперт по код-ревью. Проанализируй следующий код и укажи:\n→ Потенциальные баги\n→ Улучшения производительности\n→ Рекомендации по стилю\n\n{{code}}',
    tags: 'coding, review, python',
    isPublic: true,
    createdAt: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'demo2',
    title: 'Генератор документации',
    content: '## Задача\nСоздай документацию для функции {{functionName}}.\n\n**Требования:**\n- Описание параметров\n- Примеры использования\n- Возвращаемое значение\n- ВАЖНО: используй CAPS для акцентов',
    tags: 'documentation, coding, helper',
    isPublic: true,
    createdAt: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'demo3',
    title: 'Отладчик ошибок',
    content: '## Контекст\nЯ получил ошибку: {{errorMessage}}\n\n→ Помоги понять причину\n→ Предложи решение\n→ Дай пример исправленного кода',
    tags: 'debugging, error, fix',
    isPublic: true,
    createdAt: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'demo4',
    title: 'Email-писатель',
    content: '## Роль\nТы — профессиональный копирайтер.\n\nНапиши email на тему: {{topic}}\n\n**Стиль:** {{style}}\n**Получатель:** {{recipient}}',
    tags: 'email, writing, business',
    isPublic: true,
    createdAt: new Date().toISOString(),
    isDemo: true
  },
  {
    id: 'demo5',
    title: 'SQL-генератор',
    content: '## Запрос\nСоздай SQL-запрос для:\n{{description}}\n\n**Схема БД:**\n{{schema}}',
    tags: 'sql, database, query',
    isPublic: true,
    createdAt: new Date().toISOString(),
    isDemo: true
  }
];

export function PromptProvider({ children }: { children: ReactNode }) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedPrompts = localStorage.getItem('prompts');
    
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    } else {
      setPrompts(demoPrompts);
      localStorage.setItem('prompts', JSON.stringify(demoPrompts));
    }
    
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem('prompts', JSON.stringify(prompts));
    }
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addPrompt = (prompt: Omit<Prompt, 'id' | 'createdAt'>) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isDemo: false
    };
    setPrompts(prev => [newPrompt, ...prev]);
  };

  const updatePrompt = (id: string, prompt: Omit<Prompt, 'id' | 'createdAt'>) => {
    setPrompts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...prompt }
        : p
    ));
  };

  const deletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
    setFavorites(prev => prev.filter(fid => fid !== id));
  };

  const getMyPrompts = () => {
    return prompts.filter(p => !p.isDemo);
  };

  const getPublicPrompts = () => {
    return prompts.filter(p => p.isPublic);
  };

  const getFavorites = () => {
    return prompts.filter(p => favorites.includes(p.id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <PromptContext.Provider value={{
      prompts,
      addPrompt,
      updatePrompt,
      deletePrompt,
      getMyPrompts,
      getPublicPrompts,
      getFavorites,
      toggleFavorite,
      favorites,
    }}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompts() {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompts must be used within PromptProvider');
  }
  return context;
}