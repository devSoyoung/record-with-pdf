import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Upload, Icon, message, Button } from 'antd';
import Convert from './Converter';

const uploaderProps = {
  name: 'file',
  multiple: false,
  accept: '.pdf',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
};

/**
 * @return {null}
 */
function Uploader({ images }) {
  const [file, setFile] = useState();

  const onUpload = (info) => {
    const { status } = info.file;
    if (status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 파일이 성공적으로 업로드 되었습니다.`);
      setFile(info.file.originFileObj);
      // console.log(info.file);
    } else if (status === 'error') {
      message.error("파일 업로드에 실패했습니다.\n다시 시도해주세요.");
    }
  };

  if (images && images.length) {
    return null;
  }

  return (
    <>
      <Upload {...uploaderProps} onChange={onUpload}>
        <Button>
          <Icon type="upload" />파일 업로드
        </Button>
      </Upload>
      {file ? <Convert setFile={setFile} /> : ''}
    </>
  );
}

const mapStateToProps = state => ({
  images: state.images,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Uploader);
