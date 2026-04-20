// Path helper for translated files.

/**
 * Keep the original file path and add a language prefix.
 */
export function getTranslatedPath(
  sourcePath: string,
  targetLang: string,
  baseLanguage: string,
): string {
  void baseLanguage;

  return `translations/${targetLang}/${sourcePath}`;
}
