const initialState = [];

const Field = (state = initialState, action) => {
  switch (action.type) {
    case 'field': {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default Field;