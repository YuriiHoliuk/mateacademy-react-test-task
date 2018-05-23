const Cases = {
  KebabCase: 'kebab',
  CamelCase: 'camel',
  SnakeCase: 'snake',
  NormalCase: 'normal',
};

export class CaseFormatter {
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

  static camelToNormal(word, capitalize = true) {
    const withSpaces = word.replace(/([A-Z])+/g, ' $1');
    return capitalize
      ? withSpaces.replace(/^[a-z]/, (res) => res.toUpperCase())
      : withSpaces;
  }
}

CaseFormatter.Cases = Cases;