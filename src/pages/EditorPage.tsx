import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import PromptEditor from '../components/PromptEditor';
import { useEffect } from 'react';

const promptSchema = z.object({
  title: z.string().min(3, 'Название не менее 3 символов').max(100),
  content: z.string().min(10, 'Текст промпта не менее 10 символов'),
  tags: z.string().optional(),
  isPublic: z.boolean().optional(),
});

type PromptFormData = z.infer<typeof promptSchema>;

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const { addPrompt, updatePrompt, prompts } = usePrompts();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const existingPrompt = isEditing ? prompts.find(p => p.id === id) : null;
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: { title: '', content: '', tags: '', isPublic: false }
  });

  const contentValue = watch('content');

  useEffect(() => {
    if (existingPrompt) {
      reset({
        title: existingPrompt.title,
        content: existingPrompt.content,
        tags: existingPrompt.tags,
        isPublic: existingPrompt.isPublic,
      });
    }
  }, [existingPrompt, reset]);

  useEffect(() => {
    const savedPlaceholder = localStorage.getItem('editorPlaceholder');
    if (savedPlaceholder && !isEditing) {
      setValue('content', savedPlaceholder);
      localStorage.removeItem('editorPlaceholder');
    }
  }, [setValue, isEditing]);

  const onSubmit = (data: PromptFormData) => {
    if (isEditing && id) {
      updatePrompt(id, {
        title: data.title,
        content: data.content,
        tags: data.tags || '',
        isPublic: data.isPublic || false,
      });
      alert('✏️ Промпт обновлён!');
    } else {
      addPrompt({
        title: data.title,
        content: data.content,
        tags: data.tags || '',
        isPublic: data.isPublic || false,
      });
      alert('✨ Промпт сохранён!');
    }
    navigate('/profile/my-templates');
  };

  const helpText = '💡 Поддерживается: ## заголовки, → стрелки, {{переменные}}, CAPS для акцентов';

  return (
    <div className="form-container">
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', background: 'var(--gradient)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        {isEditing ? '✏️ Редактирование промпта' : '✏️ Создание промпта'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>📌 Название промпта</label>
          <input 
            {...register('title')} 
            className={errors.title ? 'error' : ''}
            placeholder="Например: Ассистент для код-ревью"
          />
          {errors.title && <span className="error-message">⚠️ {errors.title.message}</span>}
        </div>

        <div className="form-group">
          <label>📝 Текст промпта</label>
          <PromptEditor
            value={contentValue}
            onChange={(value: string) => setValue('content', value)}
            placeholder="## Инструкция&#10;Ты — эксперт по...&#10;→ Выполни задачу:&#10;{{variable}}"
          />
          {errors.content && <span className="error-message">⚠️ {errors.content.message}</span>}
        </div>

        <div className="form-group">
          <label>🏷️ Теги (через запятую)</label>
          <input {...register('tags')} placeholder="например: coding, python, gpt4, ai" />
        </div>

        <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" {...register('isPublic')} style={{ width: '20px', margin: 0 }} />
          <label style={{ margin: 0, cursor: 'pointer' }}>🌍 Опубликовать в публичном каталоге</label>
        </div>

        <button type="submit" className="btn">
          {isEditing ? '💾 Сохранить изменения' : '💾 Сохранить промпт'}
        </button>
      </form>

      <p style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '1rem', textAlign: 'center' }}>
        {helpText}
      </p>
    </div>
  );
}