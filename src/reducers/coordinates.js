import { letters, horizontalRows } from 'src/constants';
import { isInteger, isNumber, checkUrl, numberWithSpaces } from 'src/lib';
import {
  CHANGE_COOR_KEY,
  ACTION_WITH_FORMULA,
  CHANGE_COOR_METHOD,
} from 'src/actions/types'

const range = Array.from(horizontalRows).map((_, i) => i + 1);

const initialState = letters.reduce((column, letter) => {
  column[letter] = range.reduce((cell, number) => {
    return cell[letter + number] = { label: '', value: '', dataType: '' }, cell;
  }, {});
  return column;
}, {});

const sum = (state, cells) => cells.reduce((sum, item) =>
  (+state[item[0]][item].label.toString().replace(/,/g, '.').replace('$', '') + sum), 0);

const concat = (state, cells) => cells.reduce((string, item) =>
  (string += state[item[0]][item].label, string), '');

const average = (state, cells) => {
  const average = cells.reduce((sum, item) =>
    (+state[item[0]][item].label.toString().replace(/,/g, '.').replace('$', '') + sum), 0)/cells.length;

  return isInteger(average) ? average : average.toFixed(2);
};

const callbacks = [
  {
    name: 'sum',
    func: sum
  },
  {
    name:'concat' ,
    func: concat
  },
  {
    name: 'average',
    func: average
  }
];

const Coordinates = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COOR_KEY: {
      const { letter, num, value, keys } = action;

      const newState = JSON.parse(JSON.stringify(state));

      const cell = newState[letter][letter + num];

      const newDataType = (isNumber(value) && 'number') || value[0] === '$' && 'money' || typeof value;

      return (
        keys.forEach(key => { cell[key] = isNumber(value) ? +value : value }),
        cell.dataType = newDataType, newState
      );
    }

    case ACTION_WITH_FORMULA: {
      const { formula, cells, coordinate, hyperlink } = action;

      const nextState = JSON.parse(JSON.stringify(state));

      const selectedCells = cells.map(cell => cell.toUpperCase());

      const cell = nextState[coordinate[0]][coordinate];

      console.log(formula);

      const newValue = callback => {
        const moneyInList = cells.filter(cell => {
          const cellsValue = state[cell[0]][cell].label;
          return cellsValue[0] === '$' && (+cellsValue.slice(1)).toString() !== 'NaN'
        }).length;

        if (formula.toLowerCase() === 'sum' || formula.toLowerCase() === 'average') {
          if (moneyInList === cells.length) {

            return '$' + numberWithSpaces(callback.func(nextState, selectedCells).toFixed(2));
          } else if (moneyInList === 0) {

            return callback.func(nextState, selectedCells);
          }
        } else {
          return callback.func(nextState, selectedCells);
        }
      };

      return (
        callbacks.forEach(callback => {
          if (formula.toLowerCase() === callback.name.toLowerCase()) {
              cell.label = newValue(callback);

              delete cell.hyperlink;
          } else if (formula.toLowerCase() === 'hyperlink') {
            cell.hyperlink = {
              url: checkUrl(hyperlink.url) && hyperlink.url,
              text: checkUrl(hyperlink.url) ? hyperlink.text : '#NAME?'
            };
          }
        }), cell.value = `=${formula}(${selectedCells})`, nextState
      );
    }

    case CHANGE_COOR_METHOD: {
      return
    }

    default: {
      return state;
    }
  }
};

export default Coordinates;