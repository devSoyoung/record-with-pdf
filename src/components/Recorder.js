import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { Button } from 'antd';
import Player from './Player';

import './Recorder.css';
import { actionCreators } from "../reduxStore";

let recordInterval;

function Recorder({ isRecord, isPlaying, currentRecordTime, startRecord, stopRecord, startPlay, stopPlay }) {
  const [audio, setAudio] = useState();
  const handleClickRecordButton = isStartRecord => {
    if (isStartRecord) {
      startRecord();
      recordInterval = setInterval(() => {
        console.log('녹음 시간 증가하는 중');
      }, 1000);
      setAudio();
    } else {
      clearInterval(recordInterval);
      stopRecord();
    }
  };

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

      {!isRecord ? (
        <Button
          type="primary" ghost
          className="record-button"
          onClick={() => handleClickRecordButton(true)}
          disabled={isPlaying}
        >
          녹음하기
        </Button>
      ) : (
        <Button
          type="danger" ghost
          className="record-button"
          onClick={() => handleClickRecordButton(false)}>
          정지하기
        </Button>
      )}
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
  isPlaying: state.isPlaying,
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
