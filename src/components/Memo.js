import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { actionCreators } from '../reduxStore';

const { TextArea } = Input;

function Memo({ imageIndex, saveSlideText, slideText }) {
  const [text, setText] = useState(slideText[imageIndex] || '');

  const onChange = ({ target: { value } }) => {
    setText(value);
  };

  const onBlur = () => {
    // Store 에 저장
    saveSlideText({ imageIndex, text });
  };

  useEffect(() => {
    // store text 값으로 가져오기
    setText(slideText[imageIndex] || '')
    // setText()
  }, [imageIndex]);

  return (
    <TextArea
      placeholder={`${imageIndex + 1}번 슬라이드 메모를 입력해보세요`}
      rows={5}
      value={text}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

const mapStateToProps = state => ({
  slideText: state.slideText,
});

const mapDispatchToProps = dispatch => ({
  saveSlideText: info => dispatch(actionCreators.saveSlideText(info)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Memo);
