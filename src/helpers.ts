export const suffix = (n: number) => {
  var s = ['th', 'st', 'nd', 'rd'];
  var d = (n | 0) % 100;
  return d > 3 && d < 21 ? 'th' : s[d % 10] || 'th';
};

export const withSuffix = (n: number) => {
  return `${n}${suffix(n)}`;
};

export const titleCase = (string: string) => {
  var sentence = string.toLowerCase().split('_');
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
};
