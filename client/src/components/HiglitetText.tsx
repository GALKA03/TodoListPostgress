export default function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={i} style={{ color: 'red', fontWeight: 800 }}>{part}</span> : 
        part
      )}
    </span>
  );
}
