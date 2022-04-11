import * as Types from './types';

const initialState = {
  detailsClicked: 'account'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case Types.UPDATE_DETAILS_CLICKED:
    return { ...state, detailsClicked: action.payload.detailsClicked };
  default: return state;
  }
};

export { reducer };
