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
