import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Имя не менее 2 символов'),
  email: z.string().email('Некорректный email'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName: '', email: '' }
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Профиль обновлён', data);
    alert('Данные сохранены');
  };

  return (
    <div>
      <h1>Личный кабинет</h1>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/profile/my-templates" style={{ marginRight: '1rem' }}>Мои шаблоны</Link>
        <Link to="/profile/favorites">Избранное</Link>
      </nav>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label>Имя</label>
          <input {...register('displayName')} />
          {errors.displayName && <span style={{ color: 'red' }}>{errors.displayName.message}</span>}
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        </div>
        <button type="submit">Обновить профиль</button>
      </form>
    </div>
  );
}