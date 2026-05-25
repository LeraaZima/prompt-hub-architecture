import { useState, useCallback, useRef, useEffect } from 'react';
import { highlightPrompt } from '../utils/highlightPrompt';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PromptEditor({ value, onChange, placeholder }: PromptEditorProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const syncScroll = useCallback(() => {
    if (textareaRef.current && previewRef.current) {
      previewRef.current.scrollTop = textareaRef.current.scrollTop;
      previewRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const animateSync = useCallback(() => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(syncScroll);
  }, [syncScroll]);

  const handleScroll = () => animateSync();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    animateSync();
  };

  useEffect(() => {
    syncScroll();
  }, [syncScroll, value, isFocused]);

  useEffect(() => {
    window.addEventListener('resize', animateSync);
    return () => window.removeEventListener('resize', animateSync);
  }, [animateSync]);

  return (
    <div className="prompt-editor-container" style={{ position: 'relative', minHeight: '300px' }}>
      <div
        ref={previewRef}
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
          zIndex: 1,
          lineHeight: '1.6',
          fontSize: '14px',
          opacity: isFocused ? 0 : 1,
          visibility: isFocused ? 'hidden' : 'visible',
        }}
        dangerouslySetInnerHTML={{ __html: highlightPrompt(value) }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onScroll={handleScroll}
        placeholder={placeholder}
        spellCheck={false}      // ← Отключаем красные подчёркивания орфографии
        aria-label="Текст промпта"
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
          resize: 'vertical',
        }}
      />
    </div>
  );
}