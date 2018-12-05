import {
  CHANGE_COOR_KEY,
  FOCUS_CELL,
  ACTION_WITH_FORMULA,
  CHANGE_COOR_METHOD,
  CLEAR_FOCUS_LIST
} from './types';

export const calculateCellWithFormula = (coordinate, formula, cells, hyperlink) => {
  return {
    type: ACTION_WITH_FORMULA,
    coordinate,
    formula,
    cells: cells && cells.match(/([^\)]+)\((.*)\)/)[2].replace(/\s+/gi, '').split(','),
    hyperlink
  }
};

export const updateFieldsKeys = (letter, num, value, keys, hyperlink) => {
  return {
    type: CHANGE_COOR_KEY,
    value,
    letter,
    num,
    keys,
    hyperlink
  }
};

export const focusCell = (coordinate, ctrlKey) => {
  return {
    type: FOCUS_CELL,
    coordinate,
    ctrlKey
  }
};

export const clearFocusList = (from, to) => {
  return {
    type: CLEAR_FOCUS_LIST,
    from,
    to
  }
};
