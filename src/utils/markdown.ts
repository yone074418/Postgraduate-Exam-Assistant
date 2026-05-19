export function renderPlainMarkdown(content: string): string {
  return content
    .replace(/^###\s+(.*)$/gm, '<strong>$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}
