import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Имя не менее 2 символов'),
  email: z.string().email('Некорректный email'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { displayName: user?.name || '', email: user?.email || '' }
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Профиль обновлён', data);
    alert('✅ Данные сохранены');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem' }}>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="form-container">
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>👤 Личный кабинет</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/profile/my-templates" className="btn btn-secondary">📄 Мои шаблоны</Link>
        <Link to="/profile/favorites" className="btn btn-secondary">❤️ Избранное</Link>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>👤 Имя</label>
          <input {...register('displayName')} placeholder="Введите ваше имя" />
          {errors.displayName && <span className="error-message">⚠️ {errors.displayName.message}</span>}
        </div>
        <div className="form-group">
          <label>📧 Email</label>
          <input {...register('email')} type="email" placeholder="your@email.com" />
          {errors.email && <span className="error-message">⚠️ {errors.email.message}</span>}
        </div>
        <button type="submit" className="btn">Обновить информацию</button>
      </form>
    </div>
  );
}