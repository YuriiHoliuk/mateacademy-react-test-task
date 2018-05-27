const Cases = {
  KebabCase: 'kebab',
  CamelCase: 'camel',
  SnakeCase: 'snake',
  NormalCase: 'normal',
};

/**
 * Has static methods for transforming strings from one case to another
 *
 * TODO: implements rest methods
 * */
export class CaseFormatter {
  /**
   * Determines case type of string
   *
   * @param {string} word
   *
   * @return {string} ```'kebab' | 'camel' | 'snake' | 'normal'```
   * */
  static getCase(word) {
    if (/ /.test(word)) {
      return Cases.NormalCase;

    } else if (/-/.test(word)) {
      return Cases.KebabCase;

    } else if (/[A-Z]/.test(word)) {
      return Cases.CamelCase;

    } else if (/_/.test(word)) {
      return Cases.SnakeCase;
    }
  }

  /**
   * Convert camelCase to normal Case
   *
   * @param {string} word
   * @param {boolean} capitalize capitalize first letter if true (default = true)
   *
   * @return {string}
   * */
  static camelToNormal(word, capitalize = true) {
    const withSpaces = word.replace(/([A-Z])+/g, ' $1');
    return capitalize
      ? withSpaces.replace(/^[a-z]/, (res) => res.toUpperCase())
      : withSpaces;
  }
}

CaseFormatter.Cases = Cases;