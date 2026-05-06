import { useState, useCallback } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Поддерживаемые элементы для подсветки
const customGrammar = {
  // Заголовки
  headers: /^##\s+(.+)$/gm,
  // Разделители
  separators: /^—+$/gm,
  // Стрелки потока
  arrows: /→/g,
  // XML-теги
  xmlTags: /<(\/?)(\w+)([^>]*)>/g,
  // Переменные
  variables: /\{\{(\w+)\}\}/g,
  // Акценты (CAPS)
  caps: /\b([A-Z]{3,})\b/g,
  // MetaGlyph
  metaglyph: /[∈∩∪¬→⊕]/g,
  // Инлайн-код
  inlineCode: /`([^`]+)`/g,
  // JSON ключи
  jsonKeys: /"(\w+)":/g,
  // Декораторы
  decorators: /\+\+\+(\w+)/g,
};

export default function PromptEditor({ value, onChange, placeholder }: PromptEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  // Кастомная функция подсветки (упрощённая версия)
  const highlightText = (text: string) => {
    let highlighted = text;
    
    // Заголовки
    highlighted = highlighted.replace(/^##\s+(.+)$/gm, '<span class="hljs-keyword">##</span> <span class="hljs-title">$1</span>');
    
    // Переменные
    highlighted = highlighted.replace(/\{\{(\w+)\}\}/g, '<span class="hljs-variable">{{$1}}</span>');
    
    // Акценты CAPS
    highlighted = highlighted.replace(/\b([A-Z]{3,})\b/g, '<span class="hljs-strong">$1</span>');
    
    // Инлайн-код
    highlighted = highlighted.replace(/`([^`]+)`/g, '<code class="hljs-code">$1</code>');
    
    // Стрелки
    highlighted = highlighted.replace(/→/g, '<span class="hljs-symbol">→</span>');
    
    return highlighted;
  };

  return (
    <div className="prompt-editor-container" style={{ position: 'relative', minHeight: '300px' }}>
      {/* Подсвеченный превью (над textarea) */}
      {!isFocused && value && (
        <div 
          className="prompt-editor-preview"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'auto',
            padding: '8px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            pointerEvents: 'none',
            zIndex: 1
          }}
          dangerouslySetInnerHTML={{ __html: highlightText(value) }}
        />
      )}
      
      <textarea
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%',
          minHeight: '300px',
          padding: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.6',
          background: isFocused ? '#fff' : 'transparent',
          color: isFocused ? '#000' : 'transparent',
          caretColor: '#000',
          position: 'relative',
          zIndex: 2,
          resize: 'vertical'
        }}
      />
      
      <style>{`
        .prompt-editor-preview .hljs-keyword { color: #569cd6; font-weight: bold; }
        .prompt-editor-preview .hljs-title { color: #4ec9b0; }
        .prompt-editor-preview .hljs-variable { color: #9cdcfe; background: #2d2d2d; padding: 0 2px; border-radius: 3px; }
        .prompt-editor-preview .hljs-strong { color: #ce9178; font-weight: bold; }
        .prompt-editor-preview .hljs-code { background: #1e1e1e; color: #d4d4d4; padding: 2px 4px; border-radius: 3px; }
        .prompt-editor-preview .hljs-symbol { color: #dcdcaa; font-size: 1.2em; }
        .prompt-editor-preview code { font-family: monospace; }
      `}</style>
    </div>
  );
}