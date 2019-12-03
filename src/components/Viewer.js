import React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';

import { actionCreators } from '../reduxStore';
import Memo from './Memo';
import './Viewer.css';

const { TextArea } = Input;

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function Viewer({ isRecord, images, timeLog, imageIndex, changeImageIndex }) {
  if (!images.length) {
    return '';
  }

  function getTimeFormat(time) {
    return `${pad(Math.floor(time / 60), 2)}:${pad(time % 60, 2)}`;
  }

  return (
    <div className="viewer">
      <div className="viewer__button">
        <Button
          style={{ float: 'left' }}
          onClick={() => {
            if (imageIndex !== 0) {
              changeImageIndex(imageIndex - 1);
            }
          }}
          disabled={imageIndex === 0}
        >이전 페이지</Button>
        <Button
          style={{ float: 'right' }}
          onClick={() => {
            if (imageIndex !== images.length - 1) {
              changeImageIndex(imageIndex + 1);
            }
          }}
          disabled={imageIndex === images.length - 1}
        >다음 페이지</Button>
      </div>
      <img alt="슬라이드 현재 이미지" className="viewer__image" src={images[imageIndex]}/>
      <div className="record-time">
        <strong>녹음된 시간 : </strong>
        {!isRecord && (
          timeLog
            .filter(log => log.page === imageIndex)
            .map(log => (<span className="record-time-item">{getTimeFormat(log.time + 1)}</span>))
        )}
      </div>
      <Memo imageIndex={imageIndex} />
    </div>
  );
}


const mapStateToProps = state => ({
  images: state.images,
  timeLog: state.timeLog,
  imageIndex: state.imageIndex,
  isRecord: state.isRecord,
});

const mapDispatchToProps = dispatch => ({
  changeImageIndex: imageIndex => dispatch(actionCreators.changeImageIndex(imageIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
