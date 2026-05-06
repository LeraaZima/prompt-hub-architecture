import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Схема валидации с явными типами
const promptSchema = z.object({
  title: z.string().min(3, 'Название не менее 3 символов').max(100),
  content: z.string().min(10, 'Текст промпта не менее 10 символов'),
  tags: z.string().optional(),
  isPublic: z.boolean().optional(),
});

type PromptFormData = z.infer<typeof promptSchema>;

export default function EditorPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: { title: '', content: '', tags: '', isPublic: false }
  });

  const onSubmit = (data: PromptFormData) => {
    console.log('Форма валидна:', data);
    alert('Промпт сохранён!');
    // Здесь будет отправка на сервер
  };

  return (
    <div>
      <h1>Редактор промптов</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
        <div>
          <label>Название промпта *</label>
          <input {...register('title')} />
          {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
        </div>
        <div>
          <label>Текст промпта *</label>
          <textarea {...register('content')} rows={6} />
          {errors.content && <span style={{ color: 'red' }}>{errors.content.message}</span>}
        </div>
        <div>
          <label>Теги (через запятую)</label>
          <input {...register('tags')} placeholder="например: coding, python, gpt4" />
          {errors.tags && <span style={{ color: 'red' }}>{errors.tags.message}</span>}
        </div>
        <div>
          <label>
            <input type="checkbox" {...register('isPublic')} /> Опубликовать в хабе
          </label>
        </div>
        <button type="submit">Сохранить промпт</button>
      </form>
    </div>
  );
}