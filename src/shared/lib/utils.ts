export function identifyError(error: unknown): string | null {
  if (error == null) return null;
  if (typeof error === 'string') return error;
  if (error === true) return 'Unexpected error.';
  if (Array.isArray(error)) {
    return error
      .map(i => identifyError(i))
      .filter(Boolean)
      .join('\n');
  }
  if (typeof error === 'object' && 'message' in error) return identifyError(error.message);
  return null;
}

export function getWordFromText(text: string, offset: number): string {
  const endIndex = text.indexOf(' ', offset);
  const startIndex = text.lastIndexOf(' ', offset - 1);
  const start = startIndex < 0 ? 0 : startIndex;
  const end = endIndex < 0 ? undefined : endIndex;
  const word = text.substring(start, end);
  return word.trim();
}
