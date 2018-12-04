import { FOCUS_CELL, CLEAR_FOCUS_LIST } from '../actions/types'

const initialState = [];

const FocusList = (state = initialState, action) => {
  switch (action.type) {
    case FOCUS_CELL: {
      const { coordinate, ctrlKey } = action;

      if (!ctrlKey) return [coordinate];

      if (state.includes(action.coordinate)) return state;

      return [...state, coordinate];
    }

    case CLEAR_FOCUS_LIST: {
      const { from, to } = action;

      return state.slice(from, to);
    }

    default: {
      return state;
    }
  }
};

export default FocusList;