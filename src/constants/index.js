const alphabet = letters => {
  const arr = [];

  for (let i = 65; i <= (i + letters); i++) {
    arr.push(String.fromCharCode(i));
  }

  return arr;
};

export const rows = { length: 6 };

export const firstRow = alphabet(rows.length);
