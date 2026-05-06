export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        background: '#667eea',
        color: 'white',
        padding: '8px',
        textDecoration: 'none',
        zIndex: 1000
      }}
      onFocus={e => e.currentTarget.style.top = '0'}
      onBlur={e => e.currentTarget.style.top = '-40px'}
    >
      Перейти к основному содержанию
    </a>
  );
}