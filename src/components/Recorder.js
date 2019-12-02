import React from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import Player from './Player';

import './Recorder.css';
import { actionCreators } from "../reduxStore";

function Recorder({ isRecord, currentRecordTime, audio, setAudio }) {
  function onStop(recordedBlob) {
    setAudio(recordedBlob.blobURL);
  }

  return (
    <span>
      <ReactMic
        record={isRecord}
        className={"sound-wave".concat(isRecord ? '' : ' hide')}
        onStop={onStop}
        strokeColor="#000000"
        backgroundColor="#FFF" />

      {audio && <Player audio={audio} />}

      {isRecord && (
        <span className="time-info">
          {`${Math.floor(currentRecordTime / 60)} 분 ${currentRecordTime % 60} 초`}
        </span>
      )}
    </span>
  );
}

const mapStateToProps = state => ({
  isRecord: state.isRecord,
  currentRecordTime: state.currentRecordTime,
});

const mapDispatchToProps = dispatch => ({
  startRecord: () => dispatch(actionCreators.startRecord()),
  stopRecord: () => dispatch(actionCreators.stopRecord()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recorder);
