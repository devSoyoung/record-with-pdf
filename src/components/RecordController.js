import React, { useState }  from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Recorder from './Recorder';
import { actionCreators } from '../reduxStore';

let recordInterval;

/**
 * @return {null}
 */
function RecordController({ images, isRecord, isPlaying, startRecord, stopRecord, increaseRecordTime }) {
  const [audio, setAudio] = useState();
  const handleClickRecordButton = isStartRecord => {
    if (isStartRecord) {
      startRecord();
      recordInterval = setInterval(() => {
        increaseRecordTime();
      }, 1000);
      setAudio();
    } else {
      clearInterval(recordInterval);
      stopRecord();
    }
  };

  if (!images || !images.length) {
    return null;
  }

  return (
    <>
      <Recorder audio={audio} setAudio={setAudio} />

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
    </>
  );
}

const mapStateToProps = state => ({
  isRecord: state.isRecord,
  isPlaying: state.isPlaying,
  images: state.images,
  currentRecordTime: state.currentRecordTime,
});

const mapDispatchToProps = dispatch => ({
  startRecord: () => dispatch(actionCreators.startRecord()),
  stopRecord: () => dispatch(actionCreators.stopRecord()),
  increaseRecordTime: () => dispatch(actionCreators.increaseRecordTime()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordController);
