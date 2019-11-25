import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import { actionCreators } from '../reduxStore';

import './ImageList.css';

const { Sider } = Layout;

function ImageList({ images, imageIndex, changeImageIndex }) {
  return (
    <Sider width={120} className="viewer__side">
      {images.length ? (
        images.map((image, idx) => (
          <img
            className={"viewer__side_image".concat(imageIndex === idx ? ' focus' : '')}
            src={image}
            alt="슬라이드 이미지"
            key={`slide_image_${idx}`}
            onClick={() => changeImageIndex(idx)}
          />
        ))
      ) : ''}
    </Sider>
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
)(ImageList);
