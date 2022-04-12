import * as Types from './types';

const initialState = {
  detailsClicked: 'account',
  userId: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case Types.UPDATE_DETAILS_CLICKED:
    return { ...state, detailsClicked: action.payload.detailsClicked };
  case Types.UPDATE_USER_ID:
    return { ...state, userId: action.payload.detailsClicked };
  default: return state;
  }
};

export { reducer };
