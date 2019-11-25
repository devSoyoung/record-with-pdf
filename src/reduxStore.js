import { createStore } from 'redux';
import images from './images/pdf_sample';

function makeActionCreator(actionType) {
  return payload => ({ type: actionType, payload });
}

export const actionTypes = {
  SET_IMAGES: 'SET_IMAGES',
  CLEAR_IMAGES: 'CLEAR_IMAGES',
  CHANGE_IMAGE_INDEX: 'CHANGE_IMAGE_INDEX',
  START_RECORD: 'START_RECORD',
  STOP_RECORD: 'STOP_RECORD',
};

export const actionCreators = {
  setImages: makeActionCreator(actionTypes.SET_IMAGES),
  clearImages: makeActionCreator(actionTypes.CLEAR_IMAGES),
  changeImageIndex: makeActionCreator(actionTypes.CHANGE_IMAGE_INDEX),
  startRecord: makeActionCreator(actionTypes.START_RECORD),
  stopRecord: makeActionCreator(actionTypes.STOP_RECORD),
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };

    case actionTypes.CLEAR_IMAGES:
      return {
        ...state,
        images: [],
      };

    case actionTypes.CHANGE_IMAGE_INDEX:
      if (state.isRecord) {
        return {
          ...state,
          imageIndex: action.payload,
          pageTracker: state.pageTracker.concat({
            page: action.payload,
            time: state.currentTime,
          }),
        }
      }
      return {
        ...state,
        imageIndex: action.payload,
      };

    case actionTypes.START_RECORD:
      return {
        ...state,
        isRecord: true,
        currentTime: 0,
        pageTracker: [{
          page: state.imageIndex,
          time: 0,
        }],
      };

    case actionTypes.STOP_RECORD:
      return {
        ...state,
        isRecord: false,
      };

    default:
      return state;
  }
};

const initialState = {
  images: images,
  imageIndex: 0,
  isRecord: false,
  pageTracker: [],
  currentTime: 0,
};


const reduxStore = createStore(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default reduxStore;

