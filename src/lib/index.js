export const isNumber = n => /^-?[\d.]+(?:e-?\d+)?$/.test(n);

export const isInteger = n => ~~n === n;

export const checkUrl = url => {
  const regURL = /^(?:(?:https?|ftp|telnet):\/\/(?:[a-z0-9_-]{1,32}(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|org|mil|edu|arpa|ru|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:\/[a-z0-9.,_@%&?+=\~\/-]*)?(?:#[^ \'\"&<>]*)?$/i;
  return regURL.test(url);
};

export const numberWithSpaces = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
