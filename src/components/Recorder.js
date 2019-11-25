import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';
import { Button } from 'antd';

import './Recorder.css';
import { actionCreators } from "../reduxStore";

function Recorder({ isRecord, currentTime, startRecord, stopRecord}) {
  const [audio, setAudio] = useState();
  const handleClickRecordButton = isStartRecord => {
    if (isStartRecord) {
      startRecord();
      setAudio();
      return;
    }
    stopRecord();
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

      {audio && (
        <audio
          id="wavSource"
          className="audio-player"
          controls
        >
          <source id="audio-source" src={audio} type="audio/webm;codecs=opus" />
        </audio>
      )}

      {!isRecord ? (
        <Button
          type="primary" ghost
          className="record-button"
          onClick={() => handleClickRecordButton(true)}>
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
          {`${Math.floor(currentTime / 60)} 분 ${currentTime % 60} 초`}
        </span>
      )}
    </span>
  );
}

const mapStateToProps = state => ({
  isRecord: state.isRecord,
  currentTime: state.currentTime,
});

const mapDispatchToProps = dispatch => ({
  startRecord: () => dispatch(actionCreators.startRecord()),
  stopRecord: () => dispatch(actionCreators.stopRecord()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recorder);
