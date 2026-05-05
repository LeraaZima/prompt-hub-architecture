export default function Sidebar() {
  return (
    <aside style={{ width: '250px', padding: '1rem', borderRight: '1px solid #ccc' }}>
      <h4>Фильтры</h4>
      <ul>
        <li>По тегам</li>
        <li>По популярности</li>
        <li>Только избранное</li>
      </ul>
    </aside>
  );
}