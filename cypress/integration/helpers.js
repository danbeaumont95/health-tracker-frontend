exports.createRandomString = () => {
  const letters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
  ];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const upperCaseLetters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];

  const arr = [];
  for (let i = 0; i < 6; i++) {
    if (i === 0 || i === 3) {
      arr.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    if (i === 1 || i === 4) {
      arr.push(
        upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)]
      );
    }
    if (i === 2 || i === 5) {
      arr.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
  }

  return arr.join('').concat('@hotmail.com');
};

