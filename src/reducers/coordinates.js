import { letters, horizontalRows } from 'src/constants';

const range = Array.from(horizontalRows).map((_, i) => i + 1);

const initialState = letters.reduce((res1, item1) => (res1[item1] = range.reduce((res2, item2) => (res2[item1 + item2] = '', res2), {}), res1), {});

const Coordinates = (state = initialState, action) => {
  switch (action.type) {
    case 'field': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default Coordinates;