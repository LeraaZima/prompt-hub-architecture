import React from 'react';

interface PromptCardProps {
  id: number;
  title: string;
  description: string;
  onFavorite?: (id: number) => void;
}

const PromptCard: React.FC<PromptCardProps> = React.memo(({ id, title, description, onFavorite }) => {
  console.log(`Рендер карточки ${id}`);
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      {onFavorite && <button onClick={() => onFavorite(id)}>❤️ В избранное</button>}
    </div>
  );
});

export default PromptCard;