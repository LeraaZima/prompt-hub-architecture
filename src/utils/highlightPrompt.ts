export function highlightPrompt(text: string): string {
  let highlighted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Markdown жирный
  highlighted = highlighted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Заголовки ##
  highlighted = highlighted.replace(/^##\s+(.+)$/gm, '<span class="hljs-keyword">##</span> <span class="hljs-title">$1</span>');
  // Переменные {{var}}
  highlighted = highlighted.replace(/\{\{(\w+)\}\}/g, '<span class="hljs-variable">{{$1}}</span>');
  // CAPS (3+ заглавные)
  highlighted = highlighted.replace(/\b([A-Z]{3,})\b/g, '<span class="hljs-strong">$1</span>');
  // Инлайн-код
  highlighted = highlighted.replace(/`([^`]+)`/g, '<code class="hljs-code">$1</code>');
  // Стрелки
  highlighted = highlighted.replace(/→/g, '<span class="hljs-symbol">→</span>');
  // Декораторы +++
  highlighted = highlighted.replace(/\+\+\+(\w+)/g, '<span class="hljs-decorator">+++$1</span>');
  // XML-теги (уже экранированные)
  highlighted = highlighted.replace(/&lt;(\/?)(\w+)([^&]*)&gt;/g, '<span class="hljs-tag">&lt;$1$2$3&gt;</span>');
  // Метаглифы
  highlighted = highlighted.replace(/[∈∩∪¬⊕]/g, '<span class="hljs-metaglyph">$&</span>');
  // JSON ключи
  highlighted = highlighted.replace(/&quot;(\w+)&quot;:/g, '<span class="hljs-json-key">"$1"</span>:');
  
  return highlighted;
}