import { useState, useCallback } from 'react';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PromptEditor({ value, onChange, placeholder }: PromptEditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const highlightText = (text: string) => {
    let highlighted = text;
    
    highlighted = highlighted.replace(/^##\s+(.+)$/gm, '<span class="hljs-keyword">##</span> <span class="hljs-title">$1</span>');
    highlighted = highlighted.replace(/\{\{(\w+)\}\}/g, '<span class="hljs-variable">{{$1}}</span>');
    highlighted = highlighted.replace(/\b([A-Z]{3,})\b/g, '<span class="hljs-strong">$1</span>');
    highlighted = highlighted.replace(/`([^`]+)`/g, '<code class="hljs-code">$1</code>');
    highlighted = highlighted.replace(/→/g, '<span class="hljs-symbol">→</span>');
    highlighted = highlighted.replace(/\+\+\+(\w+)/g, '<span class="hljs-decorator">+++$1</span>');
    highlighted = highlighted.replace(/<(\/?)(\w+)([^>]*)>/g, '<span class="hljs-tag">&lt;$1$2$3&gt;</span>');
    highlighted = highlighted.replace(/[∈∩∪¬⊕]/g, '<span class="hljs-metaglyph">$&</span>');
    highlighted = highlighted.replace(/"(\w+)":/g, '<span class="hljs-json-key">"$1"</span>:');
    
    return highlighted;
  };

  return (
    <div className="prompt-editor-container" style={{ position: 'relative', minHeight: '300px' }}>
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
    </div>
  );
}