import { createStore } from 'redux';

function makeActionCreator(actionType) {
  return payload => ({ type: actionType, payload });
}

export const actionTypes = {
  SET_IMAGES: 'SET_IMAGES',
  CLEAR_IMAGES: 'CLEAR_IMAGES',
  CHANGE_IMAGE_INDEX: 'CHANGE_IMAGE_INDEX',
  START_RECORD: 'START_RECORD',
  STOP_RECORD: 'STOP_RECORD',
  START_PLAY: 'START_PLAY',
  STOP_PLAY: 'STOP_PLAY',
  INCREASE_PLAY_TIME: 'INCREASE_PLAY_TIME',
  RESET_PLAY_TIME: 'RESET_PLAY_TIME',
};

export const actionCreators = {
  setImages: makeActionCreator(actionTypes.SET_IMAGES),
  clearImages: makeActionCreator(actionTypes.CLEAR_IMAGES),
  changeImageIndex: makeActionCreator(actionTypes.CHANGE_IMAGE_INDEX),
  startRecord: makeActionCreator(actionTypes.START_RECORD),
  stopRecord: makeActionCreator(actionTypes.STOP_RECORD),
  startPlay: makeActionCreator(actionTypes.START_PLAY),
  stopPlay: makeActionCreator(actionTypes.STOP_PLAY),
  increaseTime: makeActionCreator(actionTypes.INCREASE_PLAY_TIME),
  resetTime: makeActionCreator(actionTypes.RESET_PLAY_TIME),
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
            time: state.currentRecordTime,
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
        currentRecordTime: 0,
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

    case actionTypes.START_PLAY:
      return {
        ...state,
        isPlaying: true,
      };

    case actionTypes.STOP_PLAY:
      return {
        ...state,
        isPlaying: false,
      };

    case actionTypes.INCREASE_PLAY_TIME:
      return {
        ...state,
        currentPlayTime: state.currentPlayTime + 1,
      };

    case actionTypes.RESET_PLAY_TIME:
      return {
        ...state,
        currentPlayTime: 0,
      };

    default:
      return state;
  }
};

const initialState = {
  images: [],
  imageIndex: 0,
  isRecord: false,
  pageTracker: [],
  currentRecordTime: 0,
  currentPlayTime: 0,
  isPlaying: false,
};


const reduxStore = createStore(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default reduxStore;

