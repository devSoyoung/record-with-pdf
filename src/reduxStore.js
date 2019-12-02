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
  SET_PLAY_TIME: 'SET_PLAY_TIME',
  INCREASE_RECORD_TIME: 'INCREASE_RECORD_TIME',
};

export const actionCreators = {
  setImages: makeActionCreator(actionTypes.SET_IMAGES),
  clearImages: makeActionCreator(actionTypes.CLEAR_IMAGES),
  changeImageIndex: makeActionCreator(actionTypes.CHANGE_IMAGE_INDEX),
  startRecord: makeActionCreator(actionTypes.START_RECORD),
  stopRecord: makeActionCreator(actionTypes.STOP_RECORD),
  startPlay: makeActionCreator(actionTypes.START_PLAY),
  stopPlay: makeActionCreator(actionTypes.STOP_PLAY),
  setPlayTime: makeActionCreator(actionTypes.SET_PLAY_TIME),
  increaseRecordTime: makeActionCreator(actionTypes.INCREASE_RECORD_TIME),
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
      // if (state.isRecord) {
      //   return {
      //     ...state,
      //     imageIndex: action.payload,
      //     pageTracker: {
      //       ...state.pageTracker,
      //       [state.currentRecordTime]: action.payload,
      //     },
      //   }
      // }
      return {
        ...state,
        imageIndex: action.payload,
      };

    case actionTypes.START_RECORD:
      return {
        ...state,
        isRecord: true,
        currentRecordTime: 0,
        pageTracker: {
          [state.currentRecordTime]: state.imageIndex,
        },
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
        imageIndex: state.pageTracker[state.currentPlayTime],
      };

    case actionTypes.STOP_PLAY:
      return {
        ...state,
        isPlaying: false,
      };

    case actionTypes.SET_PLAY_TIME:
      return {
        ...state,
        currentPlayTime: action.payload,
        imageIndex: state.pageTracker[action.payload],
      };

    case actionTypes.INCREASE_RECORD_TIME:
      return {
        ...state,
        currentRecordTime: state.currentRecordTime + 1,
        pageTracker: {
          ...state.pageTracker,
          [state.currentRecordTime + 1]: state.imageIndex,
        }
      };

    default:
      return state;
  }
};

const initialState = {
  images: [],
  imageIndex: 0,
  isRecord: false,
  pageTracker: {},
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

