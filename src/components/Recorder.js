import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import './Recorder.css';
import { actionCreators } from "../reduxStore";

function Recorder({ isRecord, currentTime, startRecord, stopRecord}) {
  const handleClickRecordButton = isStartRecord => {
    if (isStartRecord) {
      startRecord();
      return;
    }
    stopRecord();
  };

  return (
    <span>
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
