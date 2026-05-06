## Карта навигации (Mermaid)


graph TD
  A[Главная /] --> B[Промпт-хаб /hub]
  A --> C[База знаний /knowledge]
  A --> D[Готовые шаблоны /templates]
  B --> E[Детальный просмотр /hub/prompt/:id]
  E --> F[Избранное]
  F --> G[Личный кабинет /profile]
  G --> H[Мои шаблоны /profile/my-templates]
  G --> I[Избранное /profile/favorites]
  B --> J[Редактор /editor]
  G --> J
  A --> K[База исследований /research]
