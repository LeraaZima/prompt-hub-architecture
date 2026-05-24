import { useState, useCallback } from 'react';
import { highlightPrompt } from '../utils/highlightPrompt';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PromptEditor({ value, onChange, placeholder }: PromptEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value), [onChange]);

  return (
    <div className="prompt-editor-container" style={{ position: 'relative', minHeight: '300px' }}>
      {!isFocused && value && (
        <div className="prompt-editor-preview"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto', padding: '8px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', pointerEvents: 'none', zIndex: 1 }}
          dangerouslySetInnerHTML={{ __html: highlightPrompt(value) }}
        />
      )}
      <textarea
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        aria-label="Текст промпта"
        style={{ width: '100%', minHeight: '300px', padding: '8px', fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6', background: isFocused ? '#fff' : 'transparent', color: isFocused ? '#000' : 'transparent', caretColor: '#000', position: 'relative', zIndex: 2, resize: 'vertical' }}
      />
    </div>
  );
}