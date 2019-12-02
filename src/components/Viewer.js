import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { actionCreators } from '../reduxStore';

import './Viewer.css';

function Viewer({ images, imageIndex, changeImageIndex }) {
  if (!images.length) {
    return '';
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
    </div>
  );
}


const mapStateToProps = state => ({
  images: state.images,
  imageIndex: state.imageIndex,
});

const mapDispatchToProps = dispatch => ({
  changeImageIndex: imageIndex => dispatch(actionCreators.changeImageIndex(imageIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
